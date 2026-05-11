import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CartProvider from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

<WishlistProvider>
  <App />
</WishlistProvider>
root.render(
  <CartProvider>
    <App />
  </CartProvider>
  
);