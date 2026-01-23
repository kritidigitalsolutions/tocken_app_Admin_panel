import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import TextArea from "../../../components/forms/TextArea";
import SelectField from "../../../components/forms/SelectField";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import { fetchAboutUs, updateAboutUs } from "../../../api/aboutUs.api";
import { useTheme } from "../../../context/ThemeContext";

const AboutUs = () => {
    const [aboutUs, setAboutUs] = useState({
        title: "",
        content: "",
        mission: "",
        vision: "",
        status: "Draft",
        updatedAt: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        loadAboutUs();
    }, []);

    const loadAboutUs = async () => {
        try {
            setLoading(true);
            const res = await fetchAboutUs();
            if (res.data.aboutUs) {
                setAboutUs(res.data.aboutUs);
            }
        } catch (error) {
            console.error("Error loading About Us:", error);
            if (error.code === "ERR_NETWORK" || !error.response) {
                toast.error("Network error: Backend server not running");
            } else {
                toast.error("Failed to load About Us content");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!aboutUs.content.trim()) {
                toast.error("Content is required");
                return;
            }

            setSaving(true);
            await updateAboutUs({
                title: aboutUs.title,
                content: aboutUs.content,
                mission: aboutUs.mission,
                vision: aboutUs.vision,
                status: aboutUs.status
            });
            toast.success("About Us updated successfully");
            loadAboutUs();
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.response?.data?.message || "Failed to update About Us");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>About Us</h2>
                {aboutUs.updatedAt && (
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        Last updated: {new Date(aboutUs.updatedAt).toLocaleString("en-IN")}
                    </span>
                )}
            </div>

            <section className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                            Title
                        </label>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                            placeholder="About Us"
                            value={aboutUs.title || ""}
                            onChange={(e) => setAboutUs({ ...aboutUs, title: e.target.value })}
                        />
                    </div>

                    {/* Main Content */}
                    <TextArea
                        label="Main Content *"
                        value={aboutUs.content || ""}
                        onChange={(e) => setAboutUs({ ...aboutUs, content: e.target.value })}
                        placeholder="Write about your company, services, and values..."
                        rows={8}
                    />

                    {/* Mission */}
                    <TextArea
                        label="Our Mission"
                        value={aboutUs.mission || ""}
                        onChange={(e) => setAboutUs({ ...aboutUs, mission: e.target.value })}
                        placeholder="Our mission is to..."
                        rows={3}
                    />

                    {/* Vision */}
                    <TextArea
                        label="Our Vision"
                        value={aboutUs.vision || ""}
                        onChange={(e) => setAboutUs({ ...aboutUs, vision: e.target.value })}
                        placeholder="Our vision is to..."
                        rows={3}
                    />

                    {/* Status */}
                    <SelectField
                        label="Status"
                        value={aboutUs.status || "Draft"}
                        onChange={(e) => setAboutUs({ ...aboutUs, status: e.target.value })}
                        options={[
                            { label: "Active", value: "Active" },
                            { label: "Draft", value: "Draft" }
                        ]}
                    />

                    {/* Action Button */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button onClick={handleUpdate} disabled={saving}>
                            {saving ? "Saving..." : "Update About Us"}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Preview Section */}
            {aboutUs.content && (
                <section className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Preview</h3>
                    <div className={`p-6 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
                        <h4 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{aboutUs.title || "About Us"}</h4>
                        <div className={`whitespace-pre-wrap mb-6 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                            {aboutUs.content}
                        </div>
                        {aboutUs.mission && (
                            <div className="mb-4">
                                <h5 className="font-semibold text-blue-400 mb-2">Our Mission</h5>
                                <p className={isDark ? 'text-slate-300' : 'text-gray-600'}>{aboutUs.mission}</p>
                            </div>
                        )}
                        {aboutUs.vision && (
                            <div>
                                <h5 className="font-semibold text-green-400 mb-2">Our Vision</h5>
                                <p className={isDark ? 'text-slate-300' : 'text-gray-600'}>{aboutUs.vision}</p>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default AboutUs;
