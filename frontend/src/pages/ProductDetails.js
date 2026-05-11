import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">

      <h2>{product.name}</h2>

      <img src={product.image} alt={product.name} width="300"/>

      <p>{product.description}</p>

      <h3>₹{product.price}</h3>

    </div>
  );
}

export default ProductDetails;