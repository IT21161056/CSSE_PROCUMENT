const ReviewedOrder = require("../models/ReviewedOrder");

//Get Placed Orders For Each Supplier
const getReviewedOrders = async (req, res) => {
  try {
    const products = await ReviewedOrder.find();

    if (!products) {
      return res.send("No reviewed orders at this time!");
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
    // const { productName } = req.body;
    // if (!productName) return res.send("Product name is required!");
    const {
      _id,
      site,
      placedDate,
      requiredDate,
      approvalStatus,
      status,
      totalPrice,
      review,
    } = req.body;

    console.log(req.body.productList);

    const reviewedOrder = new ReviewedOrder({
      orderID: _id,
      site,
      placedDate,
      requiredDate,
      approvalStatus,
      status,
      totalPrice,
      review,
      productList: req.body.productList,
    });
    await reviewedOrder
      .save()
      .then((res) => {
        res.json("Successfully added!");
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
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
  getReviewedOrders,
  addReviewedOrder,
  deleteProduct,
};
