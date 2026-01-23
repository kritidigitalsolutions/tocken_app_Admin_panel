import { useEffect, useState } from "react";
import { getAllFeedbacks, getFeedbackStats, updateFeedbackStatus, deleteFeedback } from "../../../api/admin.feedback.api";
import Loader from "../../../components/common/Loader";
import { MessageSquare, User, Phone, Mail, Calendar, Trash2, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { isDark } = useTheme();

  const feedbackTypes = ["All", "Report a problem", "Raise a question", "Suggestion/Improvement", "Compliment", "Others"];
  const statuses = ["All", "PENDING", "REVIEWED", "RESOLVED", "CLOSED"];

  const loadData = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedType !== "All") params.feedbackType = selectedType;
      if (selectedStatus !== "All") params.status = selectedStatus;

      const [feedbacksRes, statsRes] = await Promise.all([
        getAllFeedbacks(params),
        getFeedbackStats()
      ]);
      setFeedbacks(feedbacksRes?.data?.feedbacks || []);
      setStats(statsRes?.data?.stats || null);
    } catch (err) {
      console.error("Error loading feedbacks:", err);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, selectedStatus]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateFeedbackStatus(id, { status: newStatus });
      loadData();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await deleteFeedback(id);
      loadData();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING": return <Clock size={14} className="text-yellow-400" />;
      case "REVIEWED": return <AlertCircle size={14} className="text-blue-400" />;
      case "RESOLVED": return <CheckCircle size={14} className="text-green-400" />;
      case "CLOSED": return <XCircle size={14} className="text-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return isDark ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-700";
      case "REVIEWED": return isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700";
      case "RESOLVED": return isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700";
      case "CLOSED": return isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600";
      default: return isDark ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-600";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Report a problem": return isDark ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700";
      case "Raise a question": return isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700";
      case "Suggestion/Improvement": return isDark ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-700";
      case "Compliment": return isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700";
      case "Others": return isDark ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-600";
      default: return isDark ? "bg-slate-700 text-slate-300" : "bg-gray-200 text-gray-600";
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-indigo-500" size={32} />
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>All Feedbacks</h1>
        </div>
        <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>View and manage user feedbacks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Feedbacks</p>
          <p className="text-3xl font-bold text-indigo-400 mt-2">{stats?.total || 0}</p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Pending</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">{stats?.byStatus?.PENDING || 0}</p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Reviewed</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{stats?.byStatus?.REVIEWED || 0}</p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Resolved</p>
          <p className="text-3xl font-bold text-green-400 mt-2">{stats?.byStatus?.RESOLVED || 0}</p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Problems</p>
          <p className="text-3xl font-bold text-red-400 mt-2">{stats?.byType?.["Report a problem"] || 0}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Type Filter */}
        <div className="flex gap-2 flex-wrap">
          <span className={`text-sm self-center mr-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Type:</span>
          {feedbackTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedType === type
                  ? "bg-indigo-600 text-white"
                  : isDark 
                    ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          <span className={`text-sm self-center mr-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Status:</span>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedStatus === status
                  ? "bg-indigo-600 text-white"
                  : isDark
                    ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="space-y-4">
        {feedbacks && feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className={`rounded-lg p-6 transition border ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left Section - User Info & Feedback */}
                <div className="flex-1">
                  {/* Type & Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(feedback.feedbackType)}`}>
                      {feedback.feedbackType}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                      {getStatusIcon(feedback.status)}
                      {feedback.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feedback.description}
                  </p>

                  {/* User Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                      <User size={14} className="text-indigo-400" />
                      {feedback.name}
                    </div>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                      <Mail size={14} className="text-green-400" />
                      {feedback.email}
                    </div>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                      <Phone size={14} className="text-blue-400" />
                      {feedback.phone}
                    </div>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      <Calendar size={14} />
                      {new Date(feedback.createdAt).toLocaleDateString()} {new Date(feedback.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex flex-col gap-2">
                  {/* Status Dropdown */}
                  <select
                    value={feedback.status}
                    onChange={(e) => handleStatusChange(feedback._id, e.target.value)}
                    className={`text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="REVIEWED">Reviewed</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isDark ? 'bg-red-900/50 hover:bg-red-800 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-700'}`}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={`rounded-lg p-12 text-center border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
            <MessageSquare size={48} className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
            <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>No feedbacks found</p>
            <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              {selectedType !== "All" || selectedStatus !== "All"
                ? "Try changing the filters"
                : "No feedback has been submitted yet"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
