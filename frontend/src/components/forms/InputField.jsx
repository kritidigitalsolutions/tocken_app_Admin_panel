const InputField = ({ label, type = "text", ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-400">{label}</label>
      <input
        type={type}
        {...props}
        className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
};

export default InputField;
