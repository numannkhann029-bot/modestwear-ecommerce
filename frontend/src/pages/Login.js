import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("user", JSON.stringify(data));

      setSuccess("✅ Login Successful!");

      setTimeout(() => {
        if (data.isAdmin) navigate("/admin");
        else navigate("/");
      }, 1500);

    } catch (error) {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <p style={styles.subText}>Welcome back! Please enter your details</p>

        {/* ✅ MESSAGE UI */}
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={submitHandler} style={styles.form}>
          
          {/* EMAIL */}
          <div style={styles.inputGroup}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.inputGroup}>
            <input
              type={showPass ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />

            <span
              style={styles.eye}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")} style={styles.link}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

/* 🎨 UPDATED PREMIUM STYLES */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff7f2", // light peach background
  },

  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  heading: {
    marginBottom: "5px",
    color: "#333",
  },

  subText: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputGroup: {
    position: "relative",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#ff8a65",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  footer: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
    color: "#555",
  },

  link: {
    color: "#ff8a65",
    cursor: "pointer",
    fontWeight: "bold",
  },

  /* ✅ NEW MESSAGE STYLES */
  error: {
    background: "#ffe5e5",
    color: "#d8000c",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "14px",
  },

  success: {
    background: "#e6ffed",
    color: "#1a7f37",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "14px",
  },
};

export default Login;