import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // ✅ LOAD FROM STORAGE
  useEffect(() => {
    const data = localStorage.getItem("wishlist");
    if (data) setWishlist(JSON.parse(data));
  }, []);

  // ✅ SAVE TO STORAGE
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ ADD / REMOVE
  const toggleWishlist = (product) => {
    const exist = wishlist.find((x) => x._id === product._id);

    if (exist) {
      setWishlist(wishlist.filter((x) => x._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};