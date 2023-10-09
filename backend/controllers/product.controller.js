const Product = require("../models/Product.model");

//Get Placed Orders For Each Supplier
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.send("No products at this time!");
    }
    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Order List By Order Id
const addProduct = async (req, res) => {
  try {
    const { productName } = req.body;
    if (!productName) return res.send("Product name is required!");
    const product = {
      productName,
    };
    await Product.create(product);
    res.status(200).json("Successfully added!");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id).then(() => {
      return res.send("Successfully deleted!");
    });
  } catch (error) {
    res.json({ error: message });
  }
};
module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
};
