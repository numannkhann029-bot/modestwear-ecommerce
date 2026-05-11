import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/user/${user._id}`
        );
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  // 🎯 STATUS STYLE FUNCTION
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { color: "orange" };
      case "shipped":
        return { color: "blue" };
      case "delivered":
        return { color: "green" };
      default:
        return { color: "black" };
    }
  };

  // 🎯 STATUS LABEL WITH ICON
  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "🟡 Pending";
      case "shipped":
        return "🚚 Shipped";
      case "delivered":
        return "✅ Delivered";
      default:
        return status;
    }
  };

  return (
    <div style={styles.page}>
      <h2>📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <h4>Order ID: {order._id}</h4>

            <p><b>Total:</b> ₹{order.totalPrice}</p>
            <p><b>Address:</b> {order.address}</p>

            {/* 🔥 STATUS DISPLAY */}
            <p>
              <b>Status:</b>{" "}
              <span style={{ ...getStatusStyle(order.status), fontWeight: "bold" }}>
                {getStatusLabel(order.status)}
              </span>
            </p>

            <div>
              {order.orderItems.map((item, i) => (
                <div key={i} style={styles.item}>
                  <img src={item.image} alt={item.name} width="50" />
                  <span>{item.name}</span>
                  <span>x{item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;

const styles = {
  page: {
    padding: "20px",
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  card: {
    background: "#fff",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  item: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginTop: "5px",
  },
};