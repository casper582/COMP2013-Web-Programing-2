import React from "react";
import CartCard from "./CartCard";

export default function CartContainer({
  cartItems,
  updateQty,
  removeFromCart,
  emptyCart,
}) {
  const cards = [];
  for (let i = 0; i < cartItems.length; i++) {
    cards.push(
      <CartCard
        key={cartItems[i].id}
        product={cartItems[i]}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
      />
    );
  }

  return (
    <div className="CartContainer">
      {cartItems.length === 0 ? <p>No items in the cart.</p> : cards}
      {cartItems.length > 0 && (
        <div className="CartListBtns">
          <button className="RemoveButton" onClick={emptyCart}>
            Empty Cart
          </button>
          <button id="BuyButton">
            Buy $
            {cartItems
              .reduce((a, c) => a + parseFloat(c.price) * c.qty, 0)
              .toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
}
