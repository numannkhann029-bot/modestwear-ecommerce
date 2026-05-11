import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await axios.get("http://localhost:5000/api/orders");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/orders/${id}/status`,
      { status }
    );
    fetchOrders();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Orders</h2>

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><b>User:</b> {order.user?.name}</p>
          <p><b>Total:</b> ₹{order.totalPrice}</p>

          <p>
            <b>Status:</b> {order.status}
          </p>

          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;