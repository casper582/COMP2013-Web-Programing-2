import React, { useState } from "react";

export default function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    if (quantity === 0) {
      alert("Must be a quantity greater than 0");
      return;
    }
    addToCart(product, quantity);
    setQuantity(0);
  };

  return (
    <div className="ProductCard">
      <img src={product.image} alt={product.productName} />
      <h4>{product.productName}</h4>
      <p>{product.brand}</p>
      <p>{product.price}</p>
      <div className="counter-container">
        <button
          className="counter-button"
          onClick={() => setQuantity(quantity - 1 >= 0 ? quantity - 1 : 0)}
        >
          -
        </button>
        <span>{quantity}</span>

        <button
          className="counter-button"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}
