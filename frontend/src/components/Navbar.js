import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const cartRef = useRef();
  const profileRef = useRef();

  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${search}`);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      {/* 🔥 LOGO */}
      <div style={styles.logoBox} onClick={() => navigate("/")}>
        <span style={styles.logoIcon}>🛍️</span>
        <h2 style={styles.logoText}>ModestWear</h2>
      </div>

      {/* 🔍 SEARCH */}
      <form onSubmit={handleSearch} style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search fashion..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </form>

      {/* RIGHT */}
      <div style={styles.navLinks}>
        <StyledLink to="/" text="Home" active={isActive("/")} />

        <span style={styles.icon}>💌</span>

        {/* 🛒 CART */}
        <div style={styles.wrapper} ref={cartRef}>
          <div style={styles.icon} onClick={() => setShowCart(!showCart)}>
            🛒
            {cart.length > 0 && (
              <span style={styles.cartBadge}>{cart.length}</span>
            )}
          </div>

          {showCart && (
            <div style={styles.dropdown}>
              <h4 style={styles.dropTitle}>Cart</h4>

              {cart.length === 0 ? (
                <p style={styles.empty}>No items</p>
              ) : (
                cart.slice(0, 3).map((item, i) => (
                  <div key={i} style={styles.cartItem}>
                    <img src={item.image} alt="" style={styles.img} />
                    <span>{item.name}</span>
                  </div>
                ))
              )}

              <button style={styles.btn} onClick={() => navigate("/cart")}>
                View Cart
              </button>
            </div>
          )}
        </div>

        {/* 👤 PROFILE */}
        {user ? (
          <div style={styles.wrapper} ref={profileRef}>
            <div
              style={styles.icon}
              onClick={() => setShowProfile(!showProfile)}
            >
              👤
            </div>

            {showProfile && (
              <div style={styles.dropdown}>
                <p style={styles.dropTitle}>Hi, {user.name}</p>

                {user.isAdmin && (
                  <p style={styles.dropItem} onClick={() => navigate("/admin")}>
                    Admin Panel
                  </p>
                )}

                <p style={styles.dropItem} onClick={() => navigate("/orders")}>
                  My Orders
                </p>

                <p style={styles.logout} onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <StyledLink to="/login" text="Login" active={isActive("/login")} />
            <StyledLink to="/register" text="Register" active={isActive("/register")} />
          </>
        )}
      </div>
    </nav>
  );
}

/* LINK */
function StyledLink({ to, text, active }) {
  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        ...(active && styles.activeLink),
      }}
    >
      {text}
    </Link>
  );
}

/* 🎨 PEACH PREMIUM STYLES */
const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 40px",
    background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    backdropFilter: "blur(10px)",
    color: "#5a3e36",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },

  logoIcon: {
    fontSize: "24px",
  },

  logoText: {
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  searchBox: {
    width: "260px",
  },

  searchInput: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "20px",
    border: "1px solid #eee",
    outline: "none",
    fontSize: "13px",
    background: "#fff",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    textDecoration: "none",
    color: "#5a3e36",
    transition: "0.3s",
  },

  activeLink: {
    color: "#ff8a65",
    fontWeight: "bold",
  },

  icon: {
    cursor: "pointer",
    position: "relative",
    fontSize: "18px",
  },

  wrapper: {
    position: "relative",
  },

  cartBadge: {
    position: "absolute",
    top: "-6px",
    right: "-8px",
    background: "#ff8a65",
    color: "#fff",
    borderRadius: "50%",
    fontSize: "10px",
    padding: "2px 6px",
  },

  dropdown: {
    position: "absolute",
    top: "40px",
    right: 0,
    background: "#fff",
    color: "#000",
    padding: "12px",
    borderRadius: "10px",
    width: "200px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  dropTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },

  dropItem: {
    padding: "6px 0",
    cursor: "pointer",
  },

  logout: {
    marginTop: "8px",
    color: "#ff8a65",
    fontWeight: "bold",
    cursor: "pointer",
  },

  empty: {
    color: "#777",
  },

  cartItem: {
    display: "flex",
    gap: "10px",
    marginBottom: "8px",
    alignItems: "center",
  },

  img: {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "6px",
  },

  btn: {
    width: "100%",
    padding: "8px",
    border: "none",
    background: "#ff8a65",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "8px",
  },
};

export default Navbar;