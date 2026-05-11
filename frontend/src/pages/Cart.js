import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const checkoutHandler = () => {
    if (!user) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    // 👉 redirect to checkout page
    navigate("/checkout");
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty</p>
      ) : (
        <div style={styles.container}>
          
          {/* 🧾 LEFT SIDE */}
          <div style={styles.left}>
            {cart.map((item) => (
              <div key={item._id} style={styles.card}>
                
                <img src={item.image} alt={item.name} style={styles.image} />

                <div style={styles.info}>
                  <h3>{item.name}</h3>
                  <p style={styles.price}>₹{item.price}</p>

                  {/* QTY */}
                  <div style={styles.qtyBox}>
                    <button
                      onClick={() => decreaseQty(item._id)}
                      style={styles.qtyBtn}
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  style={styles.remove}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* 💰 RIGHT SIDE */}
          <div style={styles.right}>
            <h3>Order Summary</h3>
            <p>Total Items: {cart.length}</p>
            <h2 style={styles.total}>₹{totalPrice}</h2>

            {/* ✅ CHECKOUT BUTTON */}
            <button onClick={checkoutHandler} style={styles.checkout}>
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

//
// 🎨 STYLES
//

const styles = {
  page: {
    padding: "30px",
    background: "linear-gradient(135deg, #f5f7fa, #e4e8eb)",
    minHeight: "100vh",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  empty: {
    textAlign: "center",
    fontSize: "18px",
  },

  container: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  left: {
    flex: 2,
  },

  right: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    height: "fit-content",
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  info: {
    flex: 1,
  },

  price: {
    color: "#555",
  },

  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },

  qtyBtn: {
    padding: "5px 10px",
    border: "none",
    background: "#000",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },

  remove: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  total: {
    margin: "10px 0",
  },

  checkout: {
    width: "100%",
    padding: "12px",
    background: "#ff3f6c",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "15px",
    fontWeight: "bold",
  },
};