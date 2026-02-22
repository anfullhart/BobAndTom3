import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [editUserId, setEditUserId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("http://localhost:3001/api/admin/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      username: form.username,
      role: form.role
    };

    // ✅ Only include password if user typed one
    if (form.password.trim() !== "") {
      payload.password = form.password;
    }

    if (editUserId) {
      await Axios.put(
        `http://localhost:3001/api/admin/users/${editUserId}`,
        payload,
        { withCredentials: true }
      );
    } else {
      await Axios.post(
        "http://localhost:3001/api/admin/users",
        payload,
        { withCredentials: true }
      );
    }

    setForm({ username: "", password: "", role: "user" });
    setEditUserId(null);
    fetchUsers();
  } catch (err) {
    console.error(err);
    setError("Failed to save user.");
  }
};

  const handleEdit = (user) => {
    setEditUserId(user.userid);
    setForm({ username: user.login, password: "", role: user.role });
  };

  const handleDelete = async (userid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await Axios.delete(`http://localhost:3001/api/admin/users/${userid}`, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Failed to delete user.");
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="user-form">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder={editUserId ? "Leave blank to keep password" : "Password"}
          value={form.password}
          onChange={handleChange}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>
        <button type="submit">{editUserId ? "Update User" : "Add User"}</button>
      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.login}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.userid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
