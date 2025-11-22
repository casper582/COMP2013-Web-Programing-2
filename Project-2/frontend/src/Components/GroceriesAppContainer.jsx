// Importing Files
import axios from "axios";
import { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import ProductForm from "./ProductForm";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";
import { useForm } from "react-hook-form";

export default function GroceriesAppContainer() {
  //////////////////////////////////////////
  // States
  const [productData, setProductData] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // useEffect
  useEffect(() => {
    handleProductsDB();
  }, []);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handlers

  // Fetching data from the database
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductData(response.data);

      setProductQuantity(
        response.data.map((product) => ({ id: product._id, quantity: 0 }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handling form data
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault;
    try {
      if (isEditing) {
        // If isEditing is true, then update the product
        try {
          await handleUpdate(formData._id);
          await setIsEditing(false);
          await setFormData({
            productName: "",
            brand: "",
            image: "",
            price: "",
          });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        // If isEditing is false, then add the product
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((response) => {
            setPostResponse(response.data.message);
          });
        setFormData({
          productName: "",
          brand: "",
          image: "",
          price: "",
        });
      }
      handleProductsDB();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handling edit product
  const handleEdit = (id) => {
    const product = productData.find((p) => p._id === id);

    setIsEditing(true);
    setFormData({
      productName: product.productName,
      brand: product.brand,
      price: product.price.replace("$", ""),
      image: product.image,
      _id: product._id,
    });
  };

  // Handling update product in the database by id
  const handleUpdate = async (id) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${id}`, formData)
        .then((response) => {
          setPostResponse(response.data.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handling delete product from the database by id
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3000/products/${id}`)
        .then((response) => {
          setPostResponse(response.data.message);
        });

      handleProductsDB(); //
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      setCartList(
        cartList.map((product) =>
          product._id === productId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } else if (mode === "product") {
      setProductQuantity(
        productQuantity.map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      setCartList(
        cartList.map((product) =>
          product._id === productId && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    } else if (mode === "product") {
      setProductQuantity(
        productQuantity.map((product) =>
          product.id === productId && product.quantity > 0
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  };

  const handleAddToCart = (productId) => {
    const product = productData.find((p) => p._id === productId);
    const pQuantity =
      productQuantity.find((p) => p.id === productId)?.quantity || 0; // FIX

    if (!pQuantity) {
      alert(`Please select quantity for ${product.productName}`);
      return;
    }

    const existing = cartList.find((p) => p._id === productId);
    if (existing) {
      setCartList(
        cartList.map((p) =>
          p._id === productId ? { ...p, quantity: p.quantity + pQuantity } : p
        )
      );
    } else {
      setCartList([...cartList, { ...product, quantity: pQuantity }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartList(cartList.filter((p) => p._id !== productId));
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  //////////////////////////////////////////
  // Render
  return (
    <div>
      <NavBar quantity={cartList.length} />
      <div className="GroceriesApp-Container">
        <ProductForm
          formData={formData}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          isEditing={isEditing}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />

        <p style={{ color: "green" }}>{postResponse}</p>

        <ProductsContainer
          products={productData}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
