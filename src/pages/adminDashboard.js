import React, { useEffect, useState } from "react";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [editUserId, setEditUserId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await Axios.get(`${API_URL}/api/admin/users`, {
        withCredentials: true,
      });

      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        username: form.username,
        role: form.role,
      };

      if (form.password.trim() !== "") {
        payload.password = form.password;
      }

      if (editUserId) {
        await Axios.put(
          `${API_URL}/api/admin/users/${editUserId}`,
          payload,
          { withCredentials: true }
        );
      } else {
        await Axios.post(
          `${API_URL}/api/admin/users`,
          payload,
          { withCredentials: true }
        );
      }

      setForm({
        username: "",
        password: "",
        role: "user",
      });

      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Failed to save user.");
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.userid);

    setForm({
      username: user.login,
      password: "",
      role: user.role,
    });
  };

  const handleDelete = async (userid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await Axios.delete(`${API_URL}/api/admin/users/${userid}`, {
        withCredentials: true,
      });

      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Failed to delete user.");
    }
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          color: "white",
        }}
      >
        <h3>Loading users...</h3>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          backgroundColor: "#1b1b1b",
          borderRadius: "15px",
          padding: "30px",
          color: "white",
          boxShadow: "0 8px 20px rgba(0,0,0,.45)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          User Administration
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1fr auto",
            gap: "15px",
            marginBottom: "35px",
          }}
        >
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            className="form-control"
            name="password"
            type="password"
            placeholder={
              editUserId
                ? "Leave blank to keep password"
                : "Password"
            }
            value={form.password}
            onChange={handleChange}
          />

          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>

          <button
            type="submit"
            className={`btn ${
              editUserId ? "btn-warning" : "btn-success"
            }`}
          >
            {editUserId ? "Update User" : "Add User"}
          </button>
        </form>

        <div style={{ overflowX: "auto" }}>
          <table className="table table-dark table-hover table-striped align-middle">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Username</th>
                <th style={{ width: "150px" }}>Role</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.userid}>
                  <td>{user.userid}</td>

                  <td>{user.login}</td>

                  <td>
                    <span
                      className={`badge ${
                        user.role === "owner"
                          ? "bg-danger"
                          : user.role === "admin"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.userid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
