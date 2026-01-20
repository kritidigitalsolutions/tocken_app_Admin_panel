import { UserCircle } from "lucide-react";

const Topbar = () => {
  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <UserCircle size={26} />
        <span className="text-sm text-slate-300">Admin</span>
      </div>
    </header>
  );
};

export default Topbar;
