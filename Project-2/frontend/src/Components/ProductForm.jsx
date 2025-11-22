export default function ProductForm({
  isEditing,
  formData,
  handleOnChange,
  handleOnSubmit,
  register,
  handleSubmit,
  errors,
}) {
  return (
    <div className="product-form">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <input
            type="text"
            name="productName"
            {...(isEditing
              ? {}
              : register("productName", {
                  required: "Product name is required",
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message:
                      "Product name should contain letters and numbers only",
                  },
                }))}
            value={formData.productName}
            onChange={handleOnChange}
            placeholder="Product Name"
          />
          {errors.productName && (
            <span style={{ color: "red" }}>{errors.productName.message}</span>
          )}
        </div>

        <div>
          <input
            type="text"
            name="brand"
            {...(isEditing
              ? {}
              : register("brand", {
                  required: "Brand is required",
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message: "Brand should contain letters and numbers only",
                  },
                }))}
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
          />
          {errors.brand && (
            <span style={{ color: "red" }}>{errors.brand.message}</span>
          )}
        </div>

        <div>
          <input
            type="text"
            name="image"
            {...(isEditing
              ? {}
              : register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                    message: "Invalid URL",
                  },
                }))}
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
          />
          {errors.image && (
            <span style={{ color: "red" }}>{errors.image.message}</span>
          )}
        </div>

        <div>
          <input
            type="number"
            name="price"
            step="0.01"
            {...(isEditing
              ? {}
              : register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be 0 or higher" },
                }))}
            value={formData.price}
            onChange={handleOnChange}
            placeholder="Price"
          />
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>

        <button type="submit">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
