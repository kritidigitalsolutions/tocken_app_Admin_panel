import { useTheme } from "../../context/ThemeContext";

const TextArea = ({ label, ...props }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="flex flex-col gap-1">
      <label className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{label}</label>
      <textarea
        {...props}
        rows={4}
        className={`rounded-lg px-3 py-2.5 text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-400' 
            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
        }`}
      />
    </div>
  );
};

export default TextArea;
