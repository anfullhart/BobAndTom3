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
  const [deletingUserId, setDeletingUserId] = useState(null);

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
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setForm({
      username: "",
      password: "",
      confirmPassword: "",
      role: "user",
    });

    setEditUserId(null);
    setError("");
  };

  const passwordsMismatch =
    form.password.length > 0 &&
    form.confirmPassword.length > 0 &&
    form.password !== form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!editUserId && !form.password.trim()) {
      setError("Password is required for new users.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        username: form.username.trim(),
        role: form.role,
      };

      if (form.password.trim() !== "") {
        payload.password = form.password;
      }

      if (editUserId) {
        await Axios.put(
          `${API_URL}/api/admin/users/${editUserId}`,
          payload,
          {
            withCredentials: true,
          }
        );

        window.alert("User updated successfully.");
      } else {
        await Axios.post(`${API_URL}/api/admin/users`, payload, {
          withCredentials: true,
        });

        window.alert("User added successfully.");
      }

      clearForm();
      await fetchUsers();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to save user."
      );
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

    setError("");

    // Scroll to the form so editing is obvious on smaller screens.
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (userid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setDeletingUserId(userid);
    setError("");

    try {
      await Axios.delete(`${API_URL}/api/admin/users/${userid}`, {
        withCredentials: true,
      });

      if (editUserId === userid) {
        clearForm();
      }

      await fetchUsers();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to delete user."
      );
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-dashboard">
        {/* HEADER */}
        <header className="admin-page-header">
          <div>
            <h1>User Administration</h1>
            <p>
              Add, edit, or remove accounts and manage their roles.
            </p>
          </div>
        </header>

        {/* FORM */}
        <form
          className={`admin-user-form ${
            editUserId ? "admin-user-form-editing" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <div className="admin-form-heading">
            <h2>{editUserId ? "Edit user" : "Add new user"}</h2>

            {editUserId && (
              <span className="admin-editing-label">
                Editing user #{editUserId}
              </span>
            )}
          </div>

          <div className="admin-form-fields">
            <div className="admin-field">
              <label htmlFor="username">
                Username <span className="admin-required">*</span>
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="e.g. jsmith"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            <div className="admin-field">
              <label htmlFor="password">
                {editUserId ? "New password" : "Password"}

                {!editUserId && (
                  <span className="admin-required"> *</span>
                )}

                {editUserId && (
                  <span className="admin-optional">
                    {" "}
                    (leave blank to keep current)
                  </span>
                )}
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder={
                  editUserId
                    ? "Leave blank to keep current"
                    : "Enter password"
                }
                value={form.password}
                onChange={handleChange}
                autoComplete={
                  editUserId ? "new-password" : "new-password"
                }
              />
            </div>

            <div className="admin-field">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={
                  passwordsMismatch ? "admin-input-error" : ""
                }
                autoComplete="new-password"
              />

              {passwordsMismatch && (
                <span className="admin-field-error">
                  Passwords don't match.
                </span>
              )}
            </div>

            <div className="admin-field">
              <label htmlFor="role">Role</label>

              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>

          <div className="admin-form-actions">
            {editUserId && (
              <button
                type="button"
                className="admin-button admin-button-secondary"
                onClick={clearForm}
                disabled={saving}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="admin-button admin-button-primary"
              disabled={saving || passwordsMismatch}
            >
              {saving
                ? "Saving..."
                : editUserId
                ? "Update user"
                : "Add user"}
            </button>
          </div>
        </form>

        {/* ERROR */}
        {error && (
          <div className="admin-alert" role="alert">
            <span>{error}</span>

            <button
              type="button"
              className="admin-alert-close"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {/* USERS */}
        <section className="admin-users-section">
          <div className="admin-section-header">
            <div>
              <h2>Users</h2>
              <span className="admin-user-count">
                {users.length}{" "}
                {users.length === 1 ? "account" : "accounts"}
              </span>
            </div>
          </div>

          <div className="admin-table-wrap">
            {loading ? (
              <div className="admin-state">
                <div className="admin-spinner" />
                <span>Loading users...</span>
              </div>
            ) : users.length === 0 ? (
              <div className="admin-state">
                <span className="admin-empty-title">
                  No users yet
                </span>
                <span>
                  Add a user above to get started.
                </span>
              </div>
            ) : (
              <table className="admin-user-table">
                <thead>
                  <tr>
                    <th className="admin-id-column">ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th className="admin-actions-header">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => {
                    const isEditing =
                      editUserId === user.userid;

                    const isDeleting =
                      deletingUserId === user.userid;

                    return (
                      <tr
                        key={user.userid}
                        className={
                          isEditing
                            ? "admin-row-editing"
                            : ""
                        }
                      >
                        <td className="admin-id-cell">
                          {user.userid}
                        </td>

                        <td className="admin-username-cell">
                          {user.login}
                        </td>

                        <td>
                          <span
                            className={`admin-role-badge admin-role-${user.role}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="admin-actions-cell">
                          <div className="admin-action-buttons">
                            <button
                              type="button"
                              className="admin-action-button admin-edit-button"
                              onClick={() => handleEdit(user)}
                              disabled={isDeleting}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="admin-action-button admin-delete-button"
                              onClick={() =>
                                handleDelete(user.userid)
                              }
                              disabled={isDeleting}
                            >
                              {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
