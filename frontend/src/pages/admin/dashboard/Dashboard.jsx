import { useEffect, useState } from "react";
import { getDashboardAnalytics } from "../../../api/admin.dashboard.api";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardAnalytics().then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Listings: {data.kpis.totalListings}</p>
      <p>Active Listings: {data.kpis.activeListings}</p>
      <p>Total Leads: {data.kpis.totalLeads}</p>
      <p>Conversion Rate: {data.kpis.conversionRate}%</p>
    </div>
  );
};

export default Dashboard;
