const Permission = ({ allow, children }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin?.permissions?.includes(allow)) return null;

  return children;
};

export default Permission;
