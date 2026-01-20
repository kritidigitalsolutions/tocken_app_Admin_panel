import { useEffect, useState } from "react";
import { fetchPlans, createPlan, updatePlan, deletePlan } from "../../../api/plans";
import toast from "react-hot-toast";
import Loader from "../../../components/common/Loader";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    planName: "",
    userType: "INDIVIDUAL",
    price: "",
    originalPrice: "",
    validityDays: "",
    tag: "",
    offerEndsInDays: "",
    features: [],
    isActive: true,
    gstIncluded: true
  });
  const [featureInput, setFeatureInput] = useState("");

  const userTypes = ["AGENT", "BUILDER", "INDIVIDUAL"];
  const tags = ["Most Popular", "Best Value", "Limited Offer", ""];

  // Load plans
  const loadPlans = async () => {
    try {
      setLoading(true);
      const res = await fetchPlans();
      setPlans(res?.data?.plans || []);
    } catch (error) {
      console.error("ERROR LOADING PLANS:", error);
      toast.error("Failed to load plans");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Add feature
  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput]
      }));
      setFeatureInput("");
    }
  };

  // Remove feature
  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update
        await updatePlan(editingId, formData);
        toast.success("Plan updated successfully");
      } else {
        // Create
        await createPlan(formData);
        toast.success("Plan created successfully");
      }

      resetForm();
      loadPlans();
    } catch (error) {
      console.error("ERROR:", error);
      toast.error(editingId ? "Failed to update plan" : "Failed to create plan");
    }
  };

  // Edit plan
  const handleEdit = (plan) => {
    setFormData({
      planName: plan.planName,
      userType: plan.userType,
      price: plan.price,
      originalPrice: plan.originalPrice,
      validityDays: plan.validityDays,
      tag: plan.tag || "",
      offerEndsInDays: plan.offerEndsInDays,
      features: plan.features || [],
      isActive: plan.isActive,
      gstIncluded: plan.gstIncluded
    });
    setEditingId(plan._id);
    setShowForm(true);
  };

  // Delete plan
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      await deletePlan(id);
      toast.success("Plan deleted successfully");
      loadPlans();
    } catch (error) {
      console.error("ERROR:", error);
      toast.error("Failed to delete plan");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      planName: "",
      userType: "INDIVIDUAL",
      price: "",
      originalPrice: "",
      validityDays: "",
      tag: "",
      offerEndsInDays: "",
      features: [],
      isActive: true,
      gstIncluded: true
    });
    setEditingId(null);
    setShowForm(false);
    setFeatureInput("");
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Plans Management</h1>
          <p className="text-slate-400 mt-2">Create and manage subscription plans</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            + Create Plan
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">
            {editingId ? "Edit Plan" : "Create New Plan"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Plan Name *</label>
                <input
                  type="text"
                  name="planName"
                  value={formData.planName}
                  onChange={handleInputChange}
                  placeholder="e.g., Pro, Pro Plus"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">User Type *</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  required
                >
                  {userTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="1499"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Original Price (₹)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="1999"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Validity Days */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Validity (Days) *</label>
                <input
                  type="number"
                  name="validityDays"
                  value={formData.validityDays}
                  onChange={handleInputChange}
                  placeholder="60"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Tag */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tag</label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                >
                  {tags.map(tag => (
                    <option key={tag} value={tag}>{tag || "None"}</option>
                  ))}
                </select>
              </div>

              {/* Offer Ends In Days */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Offer Ends In (Days)</label>
                <input
                  type="number"
                  name="offerEndsInDays"
                  value={formData.offerEndsInDays}
                  onChange={handleInputChange}
                  placeholder="4"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Features</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature"
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="hover:text-blue-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-slate-300">Active</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="gstIncluded"
                  checked={formData.gstIncluded}
                  onChange={handleInputChange}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-slate-300">GST Included</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                {editingId ? "Update Plan" : "Create Plan"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans && plans.length > 0 ? (
          plans.map(plan => (
            <div
              key={plan._id}
              className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-slate-700 bg-slate-800/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.planName}</h3>
                    <p className="text-sm text-slate-400 mt-1">{plan.userType}</p>
                  </div>
                  {plan.tag && (
                    <span className="bg-blue-900 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                      {plan.tag}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                    {plan.originalPrice && (
                      <>
                        <span className="text-sm text-slate-400 line-through">₹{plan.originalPrice}</span>
                        <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">
                          Save ₹{plan.originalPrice - plan.price}
                        </span>
                      </>
                    )}
                  </div>
                  {plan.gstIncluded && <p className="text-xs text-slate-400 mt-1">incl. GST</p>}
                </div>

                {plan.offerEndsInDays && (
                  <div className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded inline-block mb-3">
                    ⚡ Offer Ends in {plan.offerEndsInDays} days
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Validity */}
                <p className="text-sm text-slate-300 mb-4">
                  <span className="text-slate-400">Valid for</span> <span className="font-semibold">{plan.validityDays} days</span>
                </p>

                {/* Features */}
                {plan.features && plan.features.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-white mb-3">Features:</p>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </li>
                      ))}
                      {plan.features.length > 3 && (
                        <li className="text-sm text-slate-400 italic">
                          +{plan.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Status */}
                <div className="mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${plan.isActive
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                    }`}>
                    {plan.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 border-t border-slate-700 flex gap-3">
                <button
                  onClick={() => handleEdit(plan)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">No plans found</p>
            <p className="text-slate-500 text-sm mt-2">Create your first plan to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;
