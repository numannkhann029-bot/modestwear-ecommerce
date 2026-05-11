import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  // ✅ LOAD CART FROM LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ SAVE CART TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD TO CART
  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ✅ REMOVE ITEM
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  // ✅ INCREASE QTY
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, qty: (item.qty || 1) + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // ✅ DECREASE QTY
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? { ...item, qty: (item.qty || 1) - 1 }
          : item
      )
      .filter((item) => item.qty > 0);

    setCart(updatedCart);
  };

  // 🔥 NEW FUNCTION (IMPORTANT FIX)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart, // ✅ FIX ADDED
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;