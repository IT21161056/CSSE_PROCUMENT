const { request, response } = require("express");
const config = require("config");

// Singleton RecommendsModel instance
class RecommendsModelSingleton {
  constructor() {
    if (!RecommendsModelSingleton.instance) {
      this.instance = require("../models/Recommends.model");
    }
    return RecommendsModelSingleton.instance;
  }
}

const RecommendsModel = new RecommendsModelSingleton();

// ... Other imports and constants remain the same ...

// Rest of your code remains the same with minor adjustments:

// Get Request List details by ID
const getRecommendDetailsById = async (req, res) => {
  try {
    const user = await RecommendsModel.findById(req.params.id).select(
      "-requestId"
    );
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a list of Recommendations
const getRecommend = async (req, res) => {
  try {
    const recommendsModels = await RecommendsModel.find().lean();

    if (!recommendsModels) {
      return res.status(400).json({ message: "No recommended changes found!" });
    }
    res.json(recommendsModels);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

// Get a single Recommend by ID
const getSingleRecommend = async (req, res) => {
  const id = req.params.id;
  console.log(`Single recommend ID: ${id}`);

  let singleRecommend;

  try {
    singleRecommend = await RecommendsModel.findOne({ _id: id });
    res.status(200).json(singleRecommend);
  } catch (error) {
    res.status(401).json(error);
  }
};

// Add a new Recommend
const registerRecommend = async (req, res) => {
  const { orderId, description } = req.body;

  console.log(req.body);
  try {
    const user = new RecommendsModel({
      orderId,
      description,
    });

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Update a Recommend
const updateRecommend = async (req, res) => {
  const { requestId, orderId, description } = req.body;

  if (!requestId || !orderId || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const recommend = await RecommendsModel.findByIdAndUpdate(req.params.id, {
      requestId,
      orderId,
      description,
    });

    if (!recommend) {
      return res.status(404).json({ error: "Recommend not found" });
    }

    res.status(200).json(recommend);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a Recommend by ID
const deleteRecommend = async (req, res) => {
  try {
    const id = req.params.id;

    await RecommendsModel.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({ message: "Recommend Deleted" });
      })
      .catch((error) => {
        if (!id)
          return res.status(400).json({ message: "Recommend not found!" });
        else
          res.json({
            message: "Error with deleting item",
            error: error.message,
          });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getRecommendDetailsById,
  getRecommend,
  getSingleRecommend,
  registerRecommend,
  updateRecommend,
  deleteRecommend,
};
