// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const { request, response } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { DB_URI } = process.env;
const Product = require("./models/product");

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
// Connect to the database
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });

// Routes
server.get("/", (request, response) => {
  response.send("Live");
});

// GET all products
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

//add new product
server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;

  const newProduct = new Product({
    productName,
    brand,
    image,
    price,
  });

  try {
    await newProduct.save();
    response.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// DELETE product using ID
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  const objectId = new mongoose.Types.ObjectId(id);

  try {
    await Product.findByIdAndDelete(objectId);
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// update product
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const { productName, brand, image, price } = request.body;
  const objectId = new mongoose.Types.ObjectId(id);
  try {
    await Product.findByIdAndUpdate(id, {
      productName,
      brand,
      image,
      price,
    }).then((response) => {
      console.log(response);
    });

    await response
      .status(200)
      .json({ message: "Product updated successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});
