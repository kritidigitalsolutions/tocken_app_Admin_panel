const DataTable = ({ columns, children }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            {columns.map((col) => (
              <th key={col} className="p-4 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-700">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
