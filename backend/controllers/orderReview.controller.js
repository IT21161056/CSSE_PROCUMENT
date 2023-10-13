const ReviewedOrder = require("../models/ReviewedOrder");

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
const addReviewedOrder = async (req, res) => {
  try {
    console.log("controller side >>", req.body);
    // const { productName } = req.body;
    // if (!productName) return res.send("Product name is required!");
    const product = {
      productName,
    };
    await ReviewedOrder.create(product);

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
  addReviewedOrder,
  deleteProduct,
};
