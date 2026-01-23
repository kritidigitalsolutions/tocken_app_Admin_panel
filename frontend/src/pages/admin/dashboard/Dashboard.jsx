import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../../api/dashboard.api";
import { useTheme } from "../../../context/ThemeContext";
import {
  // Users,
  Home,
  PhoneCall,
  TrendingUp,
  Activity,
  // Lock
} from "lucide-react";

// 📊 Stat Card Component
const StatCard = ({ title, value, icon: Icon, color = "indigo", isDark }) => {
  const colorClass = {
    indigo: isDark ? "bg-indigo-500/10 border-indigo-500/30" : "bg-indigo-50 border-indigo-200",
    green: isDark ? "bg-green-500/10 border-green-500/30" : "bg-green-50 border-green-200",
    red: isDark ? "bg-red-500/10 border-red-500/30" : "bg-red-50 border-red-200",
    blue: isDark ? "bg-blue-500/10 border-blue-500/30" : "bg-blue-50 border-blue-200",
    purple: isDark ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-50 border-purple-200",
  }[color];

  const iconColorClass = {
    indigo: isDark ? "text-indigo-400" : "text-indigo-600",
    green: isDark ? "text-green-400" : "text-green-600",
    red: isDark ? "text-red-400" : "text-red-600",
    blue: isDark ? "text-blue-400" : "text-blue-600",
    purple: isDark ? "text-purple-400" : "text-purple-600",
  }[color];

  const valueColorClass = {
    indigo: isDark ? "text-indigo-400" : "text-indigo-700",
    green: isDark ? "text-green-400" : "text-green-700",
    red: isDark ? "text-red-400" : "text-red-700",
    blue: isDark ? "text-blue-400" : "text-blue-700",
    purple: isDark ? "text-purple-400" : "text-purple-700",
  }[color];

  return (
    <div className={`${colorClass} rounded-xl p-6 border backdrop-blur-sm hover:border-opacity-100 transition-all`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{title}</p>
          <h3 className={`text-3xl font-bold mt-2 ${valueColorClass}`}>{value ?? 0}</h3>
        </div>
        <div className={`${iconColorClass} opacity-80`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

// 📈 Simple Bar Chart Component
const BarChart = ({ data, title, isDark }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={`rounded-xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{item.label}</span>
              <span className={`text-sm font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{item.value}</span>
            </div>
            <div className={`w-full rounded-full h-2 overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
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
  const { isDark } = useTheme();

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
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>Loading dashboard...</p>
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
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h1>
        <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>Welcome back! Here's your platform overview.</p>
      </div>

      {/* KPIs Section - Real-time Data */}
      <section>
        <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>📊 Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Listings"
            value={stats?.kpis?.totalListings}
            icon={Home}
            color="blue"
            isDark={isDark}
          />
          <StatCard
            title="Active Listings"
            value={stats?.kpis?.activeListings}
            icon={Activity}
            color="green"
            isDark={isDark}
          />
          <StatCard
            title="Total Leads"
            value={stats?.kpis?.totalLeads}
            icon={PhoneCall}
            color="indigo"
            isDark={isDark}
          />
          <StatCard
            title="Today's Leads"
            value={stats?.kpis?.todayLeads}
            icon={TrendingUp}
            color="purple"
            isDark={isDark}
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats?.kpis?.conversionRate || 0}%`}
            icon={TrendingUp}
            color="indigo"
            isDark={isDark}
          />
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>📈 Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Listings by Status */}
          {listingStatusData.length > 0 && (
            <BarChart
              data={listingStatusData}
              title="Listings by Status"
              isDark={isDark}
            />
          )}

          {/* Leads Trend (Last 7 days) */}
          {leadsTrendData.length > 0 && (
            <BarChart
              data={leadsTrendData}
              title="Leads Trend (Last 7 Days)"
              isDark={isDark}
            />
          )}

          {/* Top Cities by Listings */}
          {topCitiesListingsData.length > 0 && (
            <BarChart
              data={topCitiesListingsData}
              title="Top Cities by Listings"
              isDark={isDark}
            />
          )}

          {/* Top Cities by Leads */}
          {topCitiesLeadsData.length > 0 && (
            <BarChart
              data={topCitiesLeadsData}
              title="Top Cities by Leads"
              isDark={isDark}
            />
          )}
        </div>
      </section>

      {/* High Quality Listings */}
      {stats?.insights?.highQualityListings?.length > 0 && (
        <section>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>⭐ High Quality Listings (80+ Score)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {stats.insights.highQualityListings.map((property, idx) => (
              <div key={idx} className={`rounded-xl p-6 transition border ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Property Type</p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{property.propertyType}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Score</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{property.listingScore}%</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Location</p>
                  <p className={isDark ? 'text-white' : 'text-gray-900'}>{property.location?.city}, {property.location?.locality}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Price</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{property.pricing?.rentAmount?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Stats Footer */}
      <section className={`rounded-xl p-6 mt-8 border ${isDark ? 'bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-500/20' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>✨ Quick Stats Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Listings</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{stats?.kpis?.totalListings || 0}</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Active Listings</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{stats?.kpis?.activeListings || 0}</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Leads</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{stats?.kpis?.totalLeads || 0}</p>
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Conversion Rate</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{stats?.kpis?.conversionRate || 0}%</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
