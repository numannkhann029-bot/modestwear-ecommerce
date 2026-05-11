import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Router>
      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 📄 MAIN CONTENT */}
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* 🔐 ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* 🔻 FOOTER */}
      <Footer />
    </Router>
  );
}

export default App;