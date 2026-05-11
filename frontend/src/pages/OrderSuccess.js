import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🎉 Order Placed!</h1>
        <p>Your order has been placed successfully.</p>

        <button onClick={() => navigate("/")} style={styles.btn}>
          Continue Shopping 🛍️
        </button>

        <button onClick={() => navigate("/orders")} style={styles.secondary}>
          View Orders 📦
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  btn: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    background: "#000",
    color: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
    marginRight: "10px",
  },

  secondary: {
    padding: "10px 20px",
    border: "none",
    background: "#eee",
    borderRadius: "10px",
    cursor: "pointer",
  },
};