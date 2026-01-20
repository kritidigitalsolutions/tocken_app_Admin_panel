import { useEffect, useState } from "react";
import { getAllFeedbacks, getFeedbackStats, updateFeedbackStatus, deleteFeedback } from "../../../api/admin.feedback.api";
import Loader from "../../../components/common/Loader";
import { MessageSquare, User, Phone, Mail, Calendar, Trash2, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const feedbackTypes = ["All", "Report a problem", "Raise a question", "Suggestion/Improvement", "Compliment", "Others"];
  const statuses = ["All", "PENDING", "REVIEWED", "RESOLVED", "CLOSED"];

  useEffect(() => {
    loadData();
  }, [selectedType, selectedStatus]);

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
      case "PENDING": return "bg-yellow-900 text-yellow-300";
      case "REVIEWED": return "bg-blue-900 text-blue-300";
      case "RESOLVED": return "bg-green-900 text-green-300";
      case "CLOSED": return "bg-gray-700 text-gray-300";
      default: return "bg-slate-700 text-slate-300";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Report a problem": return "bg-red-900 text-red-300";
      case "Raise a question": return "bg-blue-900 text-blue-300";
      case "Suggestion/Improvement": return "bg-purple-900 text-purple-300";
      case "Compliment": return "bg-green-900 text-green-300";
      case "Others": return "bg-slate-700 text-slate-300";
      default: return "bg-slate-700 text-slate-300";
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-indigo-500" size={32} />
          <h1 className="text-3xl font-bold text-white">All Feedbacks</h1>
        </div>
        <p className="text-slate-400 mt-2">View and manage user feedbacks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Total Feedbacks</p>
          <p className="text-3xl font-bold text-indigo-400 mt-2">{stats?.total || 0}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Pending</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">{stats?.byStatus?.PENDING || 0}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Reviewed</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{stats?.byStatus?.REVIEWED || 0}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Resolved</p>
          <p className="text-3xl font-bold text-green-400 mt-2">{stats?.byStatus?.RESOLVED || 0}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Problems</p>
          <p className="text-3xl font-bold text-red-400 mt-2">{stats?.byType?.["Report a problem"] || 0}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Type Filter */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-slate-400 text-sm self-center mr-2">Type:</span>
          {feedbackTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedType === type
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-slate-400 text-sm self-center mr-2">Status:</span>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedStatus === status
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
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
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
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
                  <p className="text-white text-sm mb-4 leading-relaxed">
                    {feedback.description}
                  </p>

                  {/* User Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <User size={14} className="text-indigo-400" />
                      {feedback.name}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail size={14} className="text-green-400" />
                      {feedback.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone size={14} className="text-blue-400" />
                      {feedback.phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
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
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="REVIEWED">Reviewed</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-800 text-red-300 rounded-lg text-sm font-medium transition"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <MessageSquare size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No feedbacks found</p>
            <p className="text-slate-500 text-sm mt-2">
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
