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
  Wallpaper
} from "lucide-react";
import clsx from "clsx";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800 text-xl font-bold text-indigo-500">
        Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">

        {/* Dashboard */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* Users */}
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <Users size={18} />
          All Users
        </NavLink>

        {/* Properties */}
        <NavLink
          to="/admin/properties"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <Home size={18} />
          All Properties
        </NavLink>

        {/* Leads */}
        <NavLink
          to="/admin/leads"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <PhoneCall size={18} />
          Leads
        </NavLink>

        {/* Bookmarks */}
        <NavLink
          to="/admin/bookmarks"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <Bookmark size={18} />
          All Bookmarks
        </NavLink>

        {/* Plans */}
        <NavLink
          to="/admin/plans"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <Layers size={18} />
          Plans
        </NavLink>

        {/* FAQs */}
        <NavLink
          to="/admin/faqs"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <HelpCircle size={18} />
          FAQs
        </NavLink>

        {/* Banners */}
        <NavLink
          to="/admin/banners"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <Image size={18} />
          Banners
        </NavLink>

        {/* Wallpapers */}
        <NavLink
          to="/admin/wallpapers"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <Wallpaper size={18} />
          Wallpapers
        </NavLink>

        {/* Feedbacks */}
        <NavLink
          to="/admin/feedbacks"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <MessageSquare size={18} />
          All Feedbacks
        </NavLink>

        {/* Notifications */}
        <NavLink
          to="/admin/notifications"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <Bell size={18} />
          Notifications
        </NavLink>

        {/* Legal Pages */}
        <NavLink
          to="/admin/legal"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <FileText size={18} />
          Legal Pages
        </NavLink>

        {/* About Us */}
        <NavLink
          to="/admin/about-us"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <Info size={18} />
          About Us
        </NavLink>

        {/* Account Deletion Requests */}
        <NavLink
          to="/admin/deletion-requests"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md transition",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )
          }
        >
          <UserX size={18} />
          Deletion Requests
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
