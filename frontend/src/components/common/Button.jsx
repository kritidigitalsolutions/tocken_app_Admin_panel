import { useTheme } from "../../context/ThemeContext";

const Button = ({ variant = "primary", children, ...props }) => {
  const { isDark } = useTheme();
  
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";

  const styles = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30",
    danger: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white shadow-lg shadow-red-500/30",
    secondary: isDark 
      ? "bg-slate-700 hover:bg-slate-600 text-white" 
      : "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/30",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
