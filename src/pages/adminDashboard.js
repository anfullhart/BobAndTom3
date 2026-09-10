import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./adminDashboard.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      username: "",
      password: "",
      confirmPassword: "",
      role: "user",
    });

    setEditUserId(null);
  };

  const passwordsMismatch =
    form.password.length > 0 &&
    form.confirmPassword.length > 0 &&
    form.password !== form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        username: form.username,
        role: form.role,
      };

      if (form.password.trim() !== "") {
        payload.password = form.password;
      }

      if (editUserId) {
        await Axios.put(`${API_URL}/api/admin/users/${editUserId}`, payload, {
          withCredentials: true,
        });

        window.alert("User updated successfully.");
      } else {
        if (!form.password.trim()) {
          window.alert("Password is required for new users.");
          setSaving(false);
          return;
        }

        await Axios.post(`${API_URL}/api/admin/users`, payload, {
          withCredentials: true,
        });

        window.alert("User added successfully.");
      }

      clearForm();
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Failed to save user.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.userid);

    setForm({
      username: user.login,
      password: "",
      confirmPassword: "",
      role: user.role,
    });
  };

  const handleDelete = async (userid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

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

  return (
    <div className="admin-page">
      <div className="admin-dashboard">
        <div className="page-header">
          <h1>User Administration</h1>
          <p>Add, edit, or remove accounts and manage their roles.</p>
        </div>

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              id="username"
              name="username"
              placeholder="e.g. jsmith"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">
              {editUserId ? "New password" : "Password"}
              {!editUserId && <span className="required"> *</span>}
              {editUserId && <span className="optional"> (optional)</span>}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder={editUserId ? "Leave blank to keep current" : "Password"}
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={passwordsMismatch ? "input-error" : ""}
            />
            {passwordsMismatch && (
              <span className="field-error">Passwords don't match.</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <div className="form-actions">
            {editUserId && (
              <button type="button" className="btn btn-ghost" onClick={clearForm}>
                Cancel edit
              </button>
            )}

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving
                ? "Saving…"
                : editUserId
                ? "Update user"
                : "Add user"}
            </button>
          </div>
        </form>

        {error && <div className="alert-banner">{error}</div>}

        <div className="table-wrap">
          {loading ? (
            <p className="loading-state">Loading users…</p>
          ) : users.length === 0 ? (
            <p className="empty-state">No users yet. Add one above to get started.</p>
          ) : (
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
                  <tr key={user.userid} className={editUserId === user.userid ? "row-editing" : ""}>
                    <td>{user.userid}</td>
                    <td>{user.login}</td>
                    <td>
                      <span className={`badge badge-${user.role}`}>{user.role}</span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn btn-sm btn-outline" onClick={() => handleEdit(user)}>
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
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
