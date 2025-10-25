import React from "react";

export default function QuantityCounter({ qty, setQty }) {
  return (
    <div className="counter-container">
      <button
        className="counter-button"
        onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
      >
        -
      </button>
      <span>{qty}</span>
      <button className="counter-button" onClick={() => setQty(qty + 1)}>
        +
      </button>
    </div>
  );
}
