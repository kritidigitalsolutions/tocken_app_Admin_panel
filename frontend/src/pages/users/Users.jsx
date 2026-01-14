import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import DataTable from "../../components/tables/DataTable";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { fetchUsers, updateUser } from "../../api/user.api";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Load users
  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data.users);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await loadUsers();
      setLoading(false);
    };
    loadInitialData();
  }, []);

  // 🔒 Block / Unblock
  const toggleBlock = async (user) => {
    try {
      await updateUser(user._id, {
        isBlocked: !user.isBlocked,
      });

      toast.success("User updated");
      loadUsers(); // refresh list
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />

      {/* 📊 Content */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">All Users</h2>
          <DataTable columns={["Name", "Phone", "User Type", "Status", "Action"]}>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="p-4">{user.firstName} {user.lastName}</td>
                <td className="p-4">{user.phone}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.isBlocked ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-4">
                  <Button
                    variant={user.isBlocked ? "primary" : "danger"}
                    onClick={() => toggleBlock(user)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default Users;
