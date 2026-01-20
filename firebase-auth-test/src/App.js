import { useState, useRef } from "react";
import { auth } from "./firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import axios from "axios";
import "./App.css";

const API_BASE = "http://localhost:5000/api";

function App() {
  // Auth states
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // App flow states
  const [currentPage, setCurrentPage] = useState("auth"); // auth, profile, dashboard
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // Profile form states
  const [userType, setUserType] = useState("INDIVIDUAL");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const sendOTP = async () => {
    setError("");

    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    if (!phoneRegex.test(phone)) {
      setError("Invalid phone format. Use E.164 format: +919876543210");
      return;
    }

    setLoading(true);
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha",
        { size: "invisible" }
      );

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );

      setConfirmation(confirmationResult);
      alert("OTP sent successfully!");
    } catch (err) {
      console.error("Send OTP Error:", err);
      setError(err.message || "Failed to send OTP");
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setError("");
    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const result = await confirmation.confirm(otp);
      const idToken = await result.user.getIdToken();

      // Send to backend for verification
      const res = await axios.post(`${API_BASE}/auth/verify-otp`, { idToken });

      console.log("Verify OTP Response:", res.data);

      // Store token
      const jwtToken = res.data.token;
      localStorage.setItem("token", jwtToken);
      setToken(jwtToken);
      setUser(res.data.user);

      // Check if profile is complete
      if (res.data.isProfileComplete) {
        setCurrentPage("dashboard");
      } else {
        setCurrentPage("profile");
      }

    } catch (err) {
      console.error("Verify OTP Error:", err);
      setError(err.response?.data?.message || err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const completeProfile = async () => {
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("First Name and Last Name are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/user/complete-profile`,
        {
          userType,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          profileImage: profileImagePreview || "" // For now, sending base64 (can be changed to Cloudinary)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Complete Profile Response:", res.data);
      setUser(res.data.user);
      setCurrentPage("dashboard");
      alert("Profile completed successfully!");

    } catch (err) {
      console.error("Complete Profile Error:", err);
      setError(err.response?.data?.message || "Failed to complete profile");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCurrentPage("auth");
    setConfirmation(null);
    setOtp("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setProfileImage(null);
    setProfileImagePreview("");
  };

  // ========== AUTH PAGE ==========
  const renderAuthPage = () => (
    <div className="auth-container">
      <h2>🔐 Firebase Phone Auth Test</h2>

      {error && <div className="error-box">{error}</div>}

      <div className="input-group">
        <label>Phone Number (E.164 format):</label>
        <input
          type="tel"
          placeholder="+919876543210"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <button onClick={sendOTP} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>

      {confirmation && (
        <div className="input-group">
          <label>Enter OTP:</label>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            maxLength={6}
          />
          <button onClick={verifyOTP} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}

      <div id="recaptcha"></div>

      <div className="info-box">
        <h4>📋 Phone Number Format Guide:</h4>
        <ul>
          <li><strong>India:</strong> +919876543210</li>
          <li><strong>USA:</strong> +12025551234</li>
          <li><strong>UK:</strong> +447911123456</li>
        </ul>
      </div>
    </div>
  );

  // ========== PROFILE PAGE ==========
  const renderProfilePage = () => (
    <div className="profile-container">
      <h2>Fill your <span className="highlight">information</span></h2>
      <p className="subtitle">Please set-up your profile here</p>

      {error && <div className="error-box">{error}</div>}

      {/* Profile Image */}
      <div className="profile-image-section">
        <div className="profile-avatar" onClick={() => fileInputRef.current?.click()}>
          {profileImagePreview ? (
            <img src={profileImagePreview} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              <span>👤</span>
            </div>
          )}
          <div className="edit-icon">✏️</div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: "none" }}
        />
      </div>

      {/* Role Selection */}
      <div className="form-section">
        <label className="required">Select your Role</label>
        <div className="role-buttons">
          {["INDIVIDUAL", "AGENT", "BUILDER"].map(role => (
            <button
              key={role}
              className={`role-btn ${userType === role ? "active" : ""}`}
              onClick={() => setUserType(role)}
            >
              {role.charAt(0) + role.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Name Fields */}
      <div className="form-row">
        <div className="form-field">
          <label className="required">First Name</label>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="required">Last Name</label>
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
      </div>

      {/* Email */}
      <div className="form-field full-width">
        <label>Email ID</label>
        <input
          type="email"
          placeholder="Email ID (Optional)"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {/* Phone (Read-only, verified) */}
      <div className="form-field full-width">
        <label className="required">Phone Number</label>
        <div className="phone-display">
          <span className="flag">🇮🇳</span>
          <span className="phone-number">{user?.phone || phone}</span>
          <span className="verified">Verified ✓</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="confirm-btn"
        onClick={completeProfile}
        disabled={loading || !firstName.trim() || !lastName.trim()}
      >
        {loading ? "Saving..." : "Confirm details"}
      </button>
    </div>
  );

  // ========== DASHBOARD PAGE ==========
  const renderDashboard = () => (
    <div className="dashboard-container">
      <h2>✅ Welcome!</h2>
      
      <div className="user-card">
        <div className="user-avatar">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="Profile" />
          ) : (
            <div className="avatar-placeholder large">👤</div>
          )}
        </div>
        <h3>{user?.firstName} {user?.lastName}</h3>
        <p className="user-type">{user?.userType}</p>
        <p className="user-phone">{user?.phone}</p>
        {user?.email && <p className="user-email">{user?.email}</p>}
      </div>

      <div className="user-details">
        <h4>📋 User Details (Stored in MongoDB)</h4>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );

  return (
    <div className="App">
      {currentPage === "auth" && renderAuthPage()}
      {currentPage === "profile" && renderProfilePage()}
      {currentPage === "dashboard" && renderDashboard()}
    </div>
  );
}

export default App;
