import { useTheme } from "../../context/ThemeContext";

const SelectField = ({ label, options = [], ...props }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="flex flex-col gap-1">
      <label className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{label}</label>
      <select
        {...props}
        className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-white' 
            : 'bg-white border-gray-300 text-gray-900'
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
