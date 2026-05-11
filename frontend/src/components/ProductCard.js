import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);

  return (
    <div className="card">

      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add To Cart
      </button>

      <Link to={`/product/${product._id}`}>
        View
      </Link>

    </div>
  );
}

export default ProductCard;

