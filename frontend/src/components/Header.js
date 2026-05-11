import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={headerStyle}>
      <h2>Abhaya Store 🛍️</h2>

      <nav>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/cart" style={linkStyle}>Cart</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/admin" style={linkStyle}>Admin</Link>
      </nav>
    </header>
  );
}

export default Header;

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  background: "#111",
  color: "#fff",
};

const linkStyle = {
  margin: "0 10px",
  color: "#fff",
  textDecoration: "none",
};