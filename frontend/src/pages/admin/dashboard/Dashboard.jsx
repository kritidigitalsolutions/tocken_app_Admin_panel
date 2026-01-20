import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../../api/dashboard.api";
import {
  // Users,
  Home,
  PhoneCall,
  TrendingUp,
  Activity,
  // Lock
} from "lucide-react";

// 📊 Stat Card Component
const StatCard = ({ title, value, icon: Icon, color = "indigo" }) => {
  const colorClass = {
    indigo: "bg-indigo-500/10 border-indigo-500/30",
    green: "bg-green-500/10 border-green-500/30",
    red: "bg-red-500/10 border-red-500/30",
    blue: "bg-blue-500/10 border-blue-500/30",
    purple: "bg-purple-500/10 border-purple-500/30",
  }[color];

  const iconColorClass = {
    indigo: "text-indigo-400",
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  }[color];

  return (
    <div className={`${colorClass} rounded-xl p-6 border backdrop-blur-sm hover:border-opacity-100 transition-all`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2">{value ?? 0}</h3>
        </div>
        <div className={`${iconColorClass} opacity-80`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

// 📈 Simple Bar Chart Component
const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">{item.label}</span>
              <span className="text-sm font-semibold text-indigo-400">{item.value}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all"
                style={{
                  width: `${(item.value / maxValue) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 📉 Trend Card Component
// const TrendCard = ({ title, stats }) => {
//   return (
//     <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
//       <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
//       <div className="space-y-3">
//         {stats.map((stat, idx) => (
//           <div key={idx} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
//             <span className="text-slate-300 text-sm">{stat.label}</span>
//             <span className="text-white font-semibold">{stat.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetchDashboardStats();
      console.log("Dashboard data:", res.data);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const listingStatusData = stats?.charts?.listingsByStatus?.map(item => ({
    label: item._id || "Unknown",
    value: item.count
  })) || [];

  const leadsTrendData = stats?.charts?.leadsTrend?.map(item => ({
    label: item._id,
    value: item.count
  })) || [];

  const topCitiesListingsData = stats?.insights?.topCitiesByListings?.map(item => ({
    label: item._id,
    value: item.count
  })) || [];

  const topCitiesLeadsData = stats?.insights?.topCitiesByLeads?.map(item => ({
    label: item._id,
    value: item.count
  })) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back! Here's your platform overview.</p>
      </div>

      {/* KPIs Section - Real-time Data */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">📊 Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Listings"
            value={stats?.kpis?.totalListings}
            icon={Home}
            color="blue"
          />
          <StatCard
            title="Active Listings"
            value={stats?.kpis?.activeListings}
            icon={Activity}
            color="green"
          />
          <StatCard
            title="Total Leads"
            value={stats?.kpis?.totalLeads}
            icon={PhoneCall}
            color="indigo"
          />
          <StatCard
            title="Today's Leads"
            value={stats?.kpis?.todayLeads}
            icon={TrendingUp}
            color="purple"
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats?.kpis?.conversionRate || 0}%`}
            icon={TrendingUp}
            color="indigo"
          />
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">📈 Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Listings by Status */}
          {listingStatusData.length > 0 && (
            <BarChart
              data={listingStatusData}
              title="Listings by Status"
            />
          )}

          {/* Leads Trend (Last 7 days) */}
          {leadsTrendData.length > 0 && (
            <BarChart
              data={leadsTrendData}
              title="Leads Trend (Last 7 Days)"
            />
          )}

          {/* Top Cities by Listings */}
          {topCitiesListingsData.length > 0 && (
            <BarChart
              data={topCitiesListingsData}
              title="Top Cities by Listings"
            />
          )}

          {/* Top Cities by Leads */}
          {topCitiesLeadsData.length > 0 && (
            <BarChart
              data={topCitiesLeadsData}
              title="Top Cities by Leads"
            />
          )}
        </div>
      </section>

      {/* High Quality Listings */}
      {stats?.insights?.highQualityListings?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">⭐ High Quality Listings (80+ Score)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {stats.insights.highQualityListings.map((property, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-slate-400 text-sm">Property Type</p>
                    <p className="text-lg font-semibold text-white">{property.propertyType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">Score</p>
                    <p className="text-2xl font-bold text-green-400">{property.listingScore}%</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-slate-400 text-sm">Location</p>
                  <p className="text-white">{property.location?.city}, {property.location?.locality}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Price</p>
                  <p className="text-white font-semibold">₹{property.pricing?.rentAmount?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Stats Footer */}
      <section className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">✨ Quick Stats Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Total Listings</p>
            <p className="text-2xl font-bold text-indigo-400">{stats?.kpis?.totalListings || 0}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Active Listings</p>
            <p className="text-2xl font-bold text-green-400">{stats?.kpis?.activeListings || 0}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Leads</p>
            <p className="text-2xl font-bold text-blue-400">{stats?.kpis?.totalLeads || 0}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Conversion Rate</p>
            <p className="text-2xl font-bold text-purple-400">{stats?.kpis?.conversionRate || 0}%</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
