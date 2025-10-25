import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ProductsContainer from "./components/ProductsContainer";
import CartContainer from "./components/CartContainer";
import products from "./data/products";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty) => {
    if (qty < 1) {
      alert("Please select at least 1 item");
      return;
    }

    let found = false;
    const newCart = [];
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === product.id) {
        newCart.push({ ...cartItems[i], qty: cartItems[i].qty + qty });
        found = true;
      } else {
        newCart.push(cartItems[i]);
      }
    }

    if (!found) newCart.push({ ...product, qty: qty });
    setCartItems(newCart);
  };

  const updateQty = (id, qty) => {
    const newCart = [];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === id) {
        if (qty < 1) continue;
        newCart.push({ ...cartItems[i], qty });
      } else {
        newCart.push(cartItems[i]);
      }
    }
    setCartItems(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = [];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id !== id) newCart.push(cartItems[i]);
    }
    setCartItems(newCart);
  };

  const emptyCart = () => setCartItems([]);

  return (
    <>
      <NavBar cartCount={cartItems.length} />
      <div className="GroceriesApp-Container">
        <ProductsContainer products={products} addToCart={addToCart} />
        <CartContainer
          cartItems={cartItems}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
          emptyCart={emptyCart}
        />
      </div>
    </>
  );
}

export default App;
