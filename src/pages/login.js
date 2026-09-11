import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://bobandtombackend-production-fb6d.up.railway.app";

  const loginUser = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await Axios.post(
        `${API_URL}/api/login`,
        { username, password },
        { withCredentials: true }
      );

      if (res.data.authenticated) {
        const role = res.data.role;

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({ username, role })
        );

        window.dispatchEvent(new Event("storage"));

        navigate("/");
      } else {
        setError(
          res.data.error || "Invalid username or password"
        );
      }
    } catch (err) {
      console.error(err);

      if (
        err.response &&
        err.response.data &&
        err.response.data.error
      ) {
        setError(err.response.data.error);
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* HEADER */}
        <div className="login-header">
          <h1>Sign In</h1>
          <p>Sign in to your account to continue.</p>
        </div>

        <form onSubmit={loginUser}>
          {/* USERNAME */}
          <div className="login-field">
            <label htmlFor="login-username">
              Username
            </label>

            <input
              id="login-username"
              type="text"
              className="login-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              disabled={isLoading}
            />
          </div>

          {/* PASSWORD */}
          <div className="login-field login-password-field">
            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              className="login-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={isLoading}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          {/* SIGN IN */}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="login-spinner" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
