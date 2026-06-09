import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Dynamically uses your deployed Railway backend URL or falls back to local testing
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await Axios.post(
        `${API_URL}/api/login`, // Dynamic API target
        { username, password },
        { withCredentials: true }
      );

      if (res.data.authenticated) {
        const role = res.data.role;

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ username, role }));

        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        setError(res.data.error || "Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Server error. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#2121ceff", minHeight: "100vh" }}
    >
      <div
        className="p-4 rounded"
        style={{
          backgroundColor: "#111",
          color: "white",
          width: "350px",
          boxShadow: "0 0 25px rgba(0,0,0,0.7)"
        }}
      >
        <h3 className="text-center mb-4">Sign In</h3>

        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
