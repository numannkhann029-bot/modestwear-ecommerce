import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
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
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      setSuccess("✅ Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setError(error.response?.data?.message || "❌ Registration Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* 🔥 LOGO */}
        <h1 style={styles.logo}>IconicWear</h1>
        <p style={styles.tagline}>Create your account</p>

        {/* ✅ MESSAGE UI */}
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={submitHandler} style={styles.form}>
          
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <div style={styles.inputGroup}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <span
              style={styles.eye}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={styles.link}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* 🎨 PEACH PREMIUM STYLES */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff7f2",
  },

  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  logo: {
    marginBottom: "5px",
    color: "#333",
    fontWeight: "bold",
  },

  tagline: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },

  inputGroup: {
    position: "relative",
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
    color: "#555",
  },

  link: {
    color: "#ff8a65",
    cursor: "pointer",
    fontWeight: "bold",
  },

  /* ✅ MESSAGE UI */
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

export default Register;