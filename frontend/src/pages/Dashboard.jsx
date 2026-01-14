import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../api/dashboard.api";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await fetchDashboardStats();
      setStats(res.data.data);
    } catch (error) {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Active Users" value={stats.activeUsers} />
        <StatCard title="Blocked Users" value={stats.blockedUsers} />
        <StatCard title="Premium Users" value={stats.premiumUsers} />
        <StatCard title="Total Plans" value={stats.totalPlans} />
        <StatCard title="Active Plans" value={stats.activePlans} />
        <StatCard title="Admins" value={stats.totalAdmins} />
      </div>
    </div>
  );
};

export default Dashboard;
