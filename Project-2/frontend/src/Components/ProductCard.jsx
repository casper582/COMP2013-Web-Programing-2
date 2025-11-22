import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  product,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  onEdit,
  onDelete,
}) {
  return (
    <div className="ProductCard">
      <h3>{product.productName}</h3>
      <img src={product.image} alt={product.productName} />
      <h4>{product.brand}</h4>
      <QuantityCounter
        id={product._id}
        mode="product"
        productQuantity={productQuantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
      />
      <b>{product.price}</b>
      <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
      <div>
        <button onClick={() => onEdit(product._id)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(product._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}
