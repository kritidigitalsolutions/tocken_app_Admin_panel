const Admin = require("../../models/admin.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const permissionsMap = require("../../utils/permissions");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("🔐 LOGIN ATTEMPT:", { email, password });

    // 1️⃣ Check email
    const admin = await Admin.findOne({ email });
    console.log("👤 Admin found:", admin ? "YES" : "NO");
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🔑 Password match:", isMatch);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 3️⃣ Generate JWT
    const token = generateToken({
      id: admin._id,
      role: admin.role
    });

    // 4️⃣ Response
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



