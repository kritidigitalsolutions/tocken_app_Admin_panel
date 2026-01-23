import { useTheme } from "../../context/ThemeContext";

const DataTable = ({ columns, children }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`rounded-lg overflow-hidden border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
      <table className="w-full text-sm">
        <thead className={isDark ? 'bg-slate-900 text-slate-400' : 'bg-gray-50 text-gray-600'}>
          <tr>
            {columns.map((col) => (
              <th key={col} className={`p-4 text-left font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={isDark ? 'divide-y divide-slate-700' : 'divide-y divide-gray-200'}>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
