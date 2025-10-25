import React from "react";
import cartEmpty from "../assets/cart-empty.png";
import cartFull from "../assets/cart-full.png";

export default function NavBar({ cartCount }) {
  return (
    <div className="NavBar">
      <div className="NavUser">Hello, Youssef</div>
      <div className="NavTitle">Grocery Shop</div>
      <div className="NavCart">
        <img src={cartCount > 0 ? cartFull : cartEmpty} alt="cart" />
      </div>
    </div>
  );
}
