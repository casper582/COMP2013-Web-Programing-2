import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsContainer({ products, addToCart }) {
  const cards = [];

  for (let i = 0; i < products.length; i++) {
    cards.push(
      <ProductCard
        key={products[i].id}
        product={products[i]}
        addToCart={addToCart}
      />
    );
  }

  return <div className="ProductsContainer">{cards}</div>;
}
