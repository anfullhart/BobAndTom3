import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async () => {
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace this with your actual backend API route
      const response = await Axios.post(
        "http://localhost:3001/api/forgot-password",
        { email }
      );

      if (response.data.success) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setError("This email is not registered.");
      }
    } catch (err) {
      setError("Unable to process request. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4" style={{ width: "380px", borderRadius: "12px" }}>
        <h3 className="text-center mb-3">Forgot Password</h3>

        <p className="text-muted text-center" style={{ fontSize: "0.9rem" }}>
          Enter your email and we’ll send you instructions to reset your password.
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {message && <div className="alert alert-success py-2">{message}</div>}

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handlePasswordReset}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
