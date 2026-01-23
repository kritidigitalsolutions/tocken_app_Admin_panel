import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SidebarProvider } from "../context/SidebarContext";

const AdminLayout = () => {
  const { isDark } = useTheme();
  
  return (
    <SidebarProvider>
      <div className={`flex h-screen overflow-hidden theme-transition ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0">
          <Topbar />

          <main className={`flex-1 overflow-y-auto p-6 theme-transition ${isDark ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
