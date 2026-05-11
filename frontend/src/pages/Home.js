import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch {
        console.log("Error loading products");
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div style={styles.container}>
      
      {/* 🌟 HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Style That Defines You ✨</h1>
        <p style={styles.heroText}>
          Premium Fashion | Elegant | Trusted Collection
        </p>
      </div>

      {/* FILTER */}
      <div style={styles.filterContainer}>
        {["all", "Watches", "women", "men","Shoes"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              ...styles.filterBtn,
              ...(filter === cat && styles.activeFilter),
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={styles.grid}>
        {filteredProducts.map((p) => (
          <div key={p._id} style={styles.card}>
            <img src={p.image} alt={p.name} style={styles.img} />
            <h3>{p.name}</h3>
            <p style={styles.desc}>{p.description}</p>
            <h4>₹{p.price}</h4>
            <button onClick={() => handleAddToCart(p)} style={styles.btn}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>

      {/* ⭐ REVIEWS */}
      <div style={styles.reviewSection}>
        <h2>What Our Customers Say 💬</h2>
        <div style={styles.reviewGrid}>
          <div style={styles.reviewCard}>
            ⭐⭐⭐⭐⭐
            <p>"Amazing quality! Loved it 😍"</p>
            <span>- Ayesha</span>
          </div>

          <div style={styles.reviewCard}>
            ⭐⭐⭐⭐☆
            <p>"Fast delivery and premium feel."</p>
            <span>- Rahul</span>
          </div>

          <div style={styles.reviewCard}>
            ⭐⭐⭐⭐⭐
            <p>"Best fashion store online!"</p>
            <span>- Fatima</span>
          </div>
        </div>
      </div>

      {/* 🏷️ AUTO SCROLL BRAND SLIDER (FIXED) */}
      <div style={styles.brandWrapper}>
        <div style={styles.brandTrack}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={styles.brandRow}>

              <img 
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nike.svg"
                alt="nike"
                style={styles.brandLogo}
              />

              <img 
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zara.svg"
                alt="zara"
                style={styles.brandLogo}
              />

              

             

              <img 
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adidas.svg"
                alt="adidas"
                style={styles.brandLogo}
              />

            </div>
          ))}
        </div>
      </div>

      {/* 🎉 POPUP */}
      {showPopup && <div style={styles.popup}>✅ Added to Cart</div>}
    </div>
  );
}

export default Home;

/* 🎨 STYLES */
const styles = {
  container: {
    background: "#fdf6f0",
  },

  hero: {
    height: "220px",
    background: "linear-gradient(135deg, #ffb199, #ffecd2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#5a3e36",
  },

  heroTitle: {
    fontSize: "34px",
    fontWeight: "bold",
  },

  heroText: {
    marginTop: "10px",
  },

  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "20px 0",
  },

  filterBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  activeFilter: {
    background: "#ff8a65",
    color: "#fff",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px",
    padding: "20px 40px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  img: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  desc: {
    fontSize: "13px",
    color: "#777",
  },

  btn: {
    width: "100%",
    padding: "10px",
    border: "none",
    background: "#ff8a65",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },

  reviewSection: {
    marginTop: "40px",
    padding: "30px",
    background: "#fff",
    textAlign: "center",
  },

  reviewGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  reviewCard: {
    width: "250px",
    padding: "15px",
    borderRadius: "10px",
    background: "#fff7f3",
  },

  /* 🔥 BRAND SLIDER */
  brandWrapper: {
    overflow: "hidden",
    background: "#fff",
    padding: "25px 0",
    marginTop: "30px",
  },

  brandTrack: {
    display: "flex",
    width: "max-content",
    animation: "scroll 25s linear infinite",
  },

  brandRow: {
    display: "flex",
    gap: "60px",
    padding: "0 50px",
    alignItems: "center",
  },

  brandLogo: {
    height: "40px",
    filter: "grayscale(100%) brightness(0.3)",
    opacity: 0.8,
    transition: "0.3s",
  },

  popup: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#ff8a65",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
  },
};