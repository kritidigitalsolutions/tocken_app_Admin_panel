const Button = ({ variant = "primary", children, ...props }) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition";

  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700",
    danger: "bg-red-600 hover:bg-red-700",
    secondary: "bg-slate-700 hover:bg-slate-600",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
