import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Layers,
  HelpCircle,
  Image,
  LogOut,
  Home,
  PhoneCall,
  Bookmark,
  MessageSquare,
  Bell,
  Info,
  UserX,
  Wallpaper,
  Menu
} from "lucide-react";
import clsx from "clsx";
import { useTheme } from "../context/ThemeContext";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isDark } = useTheme();
  const { isCollapsed, toggleSidebar } = useSidebar();
  
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };

  const linkClasses = ({ isActive }) =>
    clsx(
      "flex items-center rounded-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative group",
      isCollapsed 
        ? "w-11 h-11 justify-center mx-auto" 
        : "gap-3 px-4 py-2.5 w-full",
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
        : isDark 
          ? "text-slate-400 hover:bg-slate-800/80 hover:text-white" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    );

  // Tooltip component for collapsed state
  const Tooltip = ({ children, label }) => (
    <div className="relative group/tooltip">
      {children}
      {isCollapsed && (
        <div className={`absolute left-full ml-3 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap z-50 
          opacity-0 invisible translate-x-2 group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:translate-x-0 
          transition-all duration-300 ease-out ${
          isDark ? 'bg-slate-800 text-white shadow-xl border border-slate-700' : 'bg-gray-900 text-white shadow-xl'
        }`}>
          {label}
          <div className={`absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent ${
            isDark ? 'border-r-slate-800' : 'border-r-gray-900'
          }`} />
        </div>
      )}
    </div>
  );

  const MenuItem = ({ to, icon: Icon, label, end = false }) => (
    <Tooltip label={label}>
      <NavLink to={to} end={end} className={linkClasses}>
        <Icon size={20} className="flex-shrink-0 transition-transform duration-500" />
        <span className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap overflow-hidden ${
          isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-0'
        }`}>
          {label}
        </span>
      </NavLink>
    </Tooltip>
  );

  return (
    <aside className={`flex flex-col theme-transition border-r transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
      isCollapsed ? 'w-[76px]' : 'w-64'
    } ${
      isDark 
        ? 'bg-slate-950 border-slate-800' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Logo */}
      <div className={`h-16 flex items-center px-3 border-b ${
        isDark ? 'border-slate-800' : 'border-gray-200'
      }`}>
        <div className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isCollapsed ? 'w-11' : 'w-full'}`}>
          {/* Toggle Button - integrated with logo */}
          <button
            onClick={toggleSidebar}
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isDark 
                ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600' 
                : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600'
            } shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <div className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
              <Menu size={20} className="text-white" />
            </div>
          </button>
          
          <span className={`text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            Admin Panel
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className={`flex-1 p-3 space-y-1.5 overflow-y-auto overflow-x-hidden ${isCollapsed ? 'px-2' : ''}`}>

        <MenuItem to="/admin" icon={LayoutDashboard} label="Dashboard" end />
        <MenuItem to="/admin/users" icon={Users} label="All Users" />
        <MenuItem to="/admin/properties" icon={Home} label="All Properties" />
        <MenuItem to="/admin/leads" icon={PhoneCall} label="Leads" />
        <MenuItem to="/admin/bookmarks" icon={Bookmark} label="All Bookmarks" />
        <MenuItem to="/admin/plans" icon={Layers} label="Plans" />
        <MenuItem to="/admin/faqs" icon={HelpCircle} label="FAQs" />
        <MenuItem to="/admin/banners" icon={Image} label="Banners" />
        <MenuItem to="/admin/wallpapers" icon={Wallpaper} label="Wallpapers" />
        <MenuItem to="/admin/feedbacks" icon={MessageSquare} label="All Feedbacks" />
        <MenuItem to="/admin/notifications" icon={Bell} label="Notifications" />
        <MenuItem to="/admin/legal" icon={FileText} label="Legal Pages" />
        <MenuItem to="/admin/about-us" icon={Info} label="About Us" />
        <MenuItem to="/admin/deletion-requests" icon={UserX} label="Deletion Requests" />

      </nav>

      {/* Logout */}
      <div className={`p-3 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'} ${isCollapsed ? 'px-2' : ''}`}>
        <Tooltip label="Logout">
          <button
            onClick={handleLogout}
            className={`flex items-center rounded-xl transition-all duration-300 ease-in-out ${
              isCollapsed 
                ? 'w-11 h-11 justify-center mx-auto' 
                : 'gap-3 px-4 py-2.5 w-full'
            } ${
              isDark 
                ? 'text-slate-400 hover:bg-red-500/15 hover:text-red-400' 
                : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <LogOut size={20} className="flex-shrink-0 transition-transform duration-300" />
            <span className={`transition-all duration-300 ease-in-out whitespace-nowrap ${
              isCollapsed ? 'w-0 opacity-0 scale-95 absolute' : 'w-auto opacity-100 scale-100'
            }`}>
              Logout
            </span>
          </button>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
