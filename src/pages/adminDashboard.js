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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check passwords match
    if (form.password !== form.confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        username: form.username,
        role: form.role,
      };

      // Only send password if one was entered
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

        window.alert("User updated successfully!");
      } else {
        if (!form.password.trim()) {
          window.alert("Password is required for new users.");
          return;
        }

        await Axios.post(
          `${API_URL}/api/admin/users`,
          payload,
          {
            withCredentials: true,
          }
        );

        window.alert("User added successfully!");
      }

      clearForm();
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
      confirmPassword: "",
      role: user.role,
    });
  };


  const handleDelete = async (userid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await Axios.delete(
        `${API_URL}/api/admin/users/${userid}`,
        {
          withCredentials: true,
        }
      );

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
          color: "white",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <h3>Loading users...</h3>
      </div>
    );


  if (error)
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        minHeight: "100vh",
      }}
    >

      <div
        style={{
          backgroundColor: "#1b1b1b",
          color: "white",
          width: "100%",
          maxWidth: "1100px",
          padding: "30px",
          borderRadius: "15px",
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
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "15px",
            marginBottom: "30px",
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
                ? "New password (optional)"
                : "Password"
            }
            value={form.password}
            onChange={handleChange}
          />


          <input
            className="form-control"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
          />


          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="owner">
              Owner
            </option>

          </select>


          <button
            className={
              editUserId
                ? "btn btn-warning"
                : "btn btn-success"
            }
            type="submit"
          >
            {editUserId
              ? "Update User"
              : "Add User"}
          </button>


          {editUserId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearForm}
            >
              Cancel Edit
            </button>
          )}

        </form>



        <div style={{ overflowX: "auto" }}>

          <table className="table table-dark table-striped table-hover">

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

                  <td>
                    {user.userid}
                  </td>


                  <td>
                    {user.login}
                  </td>


                  <td>
                    <span
                      className={
                        user.role === "owner"
                          ? "badge bg-danger"
                          : user.role === "admin"
                          ? "badge bg-warning text-dark"
                          : "badge bg-secondary"
                      }
                    >
                      {user.role}
                    </span>
                  </td>


                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>


                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(user.userid)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};


export default AdminDashboard;
