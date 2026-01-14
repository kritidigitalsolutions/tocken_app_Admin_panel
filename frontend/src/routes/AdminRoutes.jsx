import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import Plans from "../pages/plans/Plans";
import FAQs from "../pages/faqs/FAQs";
import Banners from "../pages/banners/Banners";
import LegalPages from "../pages/legal/LegalPages";
import ProtectedRoute from "../components/common/ProtectedRoute";
// for properties and leads
import Properties from "../pages/admin/properties/Properties";
import Leads from "../pages/admin/leads/Leads";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="plans" element={<Plans />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="banners" element={<Banners />} />
        <Route path="legal" element={<LegalPages />} />
        <Route path="properties" element={<Properties />} />
        <Route path="leads" element={<Leads />} />
        

      </Route>
    </Routes>
  );
};

export default AdminRoutes;
