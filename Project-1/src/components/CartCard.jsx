import React from "react";
import QuantityCounter from "./QuantityCounter";

export default function CartCard({ product, updateQty, removeFromCart }) {
  return (
    <div className="CartCard">
      <img src={product.image} alt={product.productName} />
      <div className="CartCardInfo">
        <h4>{product.productName}</h4>
        <p>{product.price}</p>
        <QuantityCounter
          qty={product.qty}
          setQty={(val) => updateQty(product.id, val)}
        />

        <p>
          Subtotal: $
          {(parseFloat(product.price.slice(1)) * product.qty).toFixed(2)}
        </p>

        <button
          className="RemoveButton"
          onClick={() => removeFromCart(product.id)}
        >
          Remove Item
        </button>
      </div>
    </div>
  );
}
