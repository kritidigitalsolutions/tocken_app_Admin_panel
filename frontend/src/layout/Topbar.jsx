import { UserCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  // Get page title from route
  const getPageTitle = () => {
    const path = location.pathname;
    const routes = {
      '/admin': 'Dashboard',
      '/admin/users': 'All Users',
      '/admin/properties': 'All Properties',
      '/admin/leads': 'Leads',
      '/admin/bookmarks': 'All Bookmarks',
      '/admin/plans': 'Plans',
      '/admin/faqs': 'FAQs',
      '/admin/banners': 'Banners',
      '/admin/wallpapers': 'Wallpapers',
      '/admin/feedbacks': 'All Feedbacks',
      '/admin/notifications': 'Notifications',
      '/admin/legal': 'Legal Pages',
      '/admin/about-us': 'About Us',
      '/admin/deletion-requests': 'Deletion Requests',
    };
    return routes[path] || 'Dashboard';
  };
  
  return (
    <header className={`h-16 flex items-center justify-between px-6 theme-transition border-b ${
      isDark 
        ? 'bg-slate-950 border-slate-800' 
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <div className="flex items-center gap-4">
        <h1 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`theme-toggle p-2.5 rounded-xl transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' 
              : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'
          }`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <Sun size={20} className="theme-toggle-icon" />
          ) : (
            <Moon size={20} className="theme-toggle-icon" />
          )}
        </button>

        {/* User Profile */}
        <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
          isDark ? 'bg-slate-800' : 'bg-gray-100'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isDark ? 'bg-indigo-600' : 'bg-indigo-500'
          }`}>
            <UserCircle size={20} className="text-white" />
          </div>
          <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
            Admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
