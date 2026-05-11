import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("cod");
  const [showQR, setShowQR] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // 🔥 Load Razorpay Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🔥 CREATE CLEAN ORDER ITEMS (FIXED)
  const buildOrderItems = () => {
    return cart.map((item) => ({
      name: item.name,
      qty: item.qty || 1,
      image: item.image,
      price: item.price,
      product: item._id, // ✅ IMPORTANT FIX
    }));
  };

  // 🔥 ONLINE PAYMENT
  const handlePayment = async () => {
    setError("");
    setSuccess("");

    if (!user) return setError("⚠️ Please login first");
    if (!address.trim()) return setError("⚠️ Enter address");
    if (!phone.trim()) return setError("⚠️ Enter phone");
    if (cart.length === 0) return setError("⚠️ Cart empty");

    const loaded = await loadRazorpay();
    if (!loaded) return setError("❌ Razorpay SDK failed");

    try {
      // ✅ Create Razorpay order
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: totalPrice }
      );

      const options = {
        key: "rzp_test_SdMTuYIuNkzS0E",
        amount: data.amount,
        currency: "INR",
        name: "Modest Wear",
        description: "Order Payment",
        order_id: data.id,

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        // ✅ PAYMENT SUCCESS
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              const orderItems = buildOrderItems();

              await axios.post("http://localhost:5000/api/orders", {
                orderItems,
                totalPrice,
                user: user._id,
                address,
                phone,
              });

              clearCart();
              setSuccess("✅ Payment Verified & Order Placed!");
              setTimeout(() => navigate("/"), 2000);
            } else {
              setError("❌ Payment verification failed");
            }
          } catch (err) {
            console.log(err.response?.data || err.message);
            setError("❌ Payment verification error");
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: phone,
        },

        theme: {
          color: "#ff8a65",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.log(err.response?.data || err.message);
      setError("❌ Payment failed");
    }
  };

  // 🔥 COD / QR ORDER
  const placeOrder = async () => {
    setError("");
    setSuccess("");

    if (!user) {
      setError("⚠️ Please login first");
      navigate("/login");
      return;
    }

    if (!address.trim()) return setError("⚠️ Enter address");
    if (!phone.trim()) return setError("⚠️ Enter phone");
    if (cart.length === 0) return setError("⚠️ Cart empty");

    try {
      const orderItems = buildOrderItems();

      await axios.post("http://localhost:5000/api/orders", {
        orderItems,
        totalPrice,
        user: user._id,
        address,
        phone,
      });

      clearCart();
      setSuccess("✅ Order Placed Successfully!");
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      console.log(err.response?.data || err.message);
      setError("❌ Failed to place order");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={styles.input}
      />

      <h3>Select Payment</h3>

      <div style={styles.paymentBox}>
        <label>
          <input
            type="radio"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            checked={payment === "online"}
            onChange={() => setPayment("online")}
          />
          UPI / Card / Netbanking
        </label>

        <label>
          <input
            type="radio"
            checked={payment === "upi"}
            onChange={() => setPayment("upi")}
          />
          UPI QR (Manual)
        </label>
      </div>

      {/* QR */}
      {payment === "upi" && (
        <div style={styles.qrBox}>
          <img src="/qr.png" alt="QR" style={{ width: "200px" }} />
          <p>Scan & Pay</p>
          <button onClick={() => setShowQR(true)} style={styles.btn}>
            Payment Done
          </button>
        </div>
      )}

      {/* ONLINE */}
      {payment === "online" && (
        <button onClick={handlePayment} style={styles.orderBtn}>
          Pay Now ₹{totalPrice}
        </button>
      )}

      {/* COD / QR */}
      {(payment === "cod" || showQR) && (
        <button onClick={placeOrder} style={styles.orderBtn}>
          Place Order ₹{totalPrice}
        </button>
      )}
    </div>
  );
}

export default Checkout;

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "30px",
    maxWidth: "400px",
    margin: "auto",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  paymentBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "15px 0",
  },
  qrBox: {
    textAlign: "center",
    marginTop: "20px",
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#ff8a65",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
  orderBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    background: "#ff8a65",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    background: "#ffe5e5",
    color: "#d8000c",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  success: {
    background: "#e6ffed",
    color: "#1a7f37",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
  },
};