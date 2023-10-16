// const bcrypt = require("bcryptjs");
const { request, response } = require("express");
const Recommend = require("../models/Recommends.model");
// const jwt = require("jsonwebtoken");
const config = require("config");

//get Request List details by id
const getRecommendById = async (request, response) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Recommend.findById(request.params.id).select("-requestId");

    response.json(user);
  } catch (err) {
    console.log(err.message);
    response.status(500).send("Server Error");
  }
};

//get RequestList List
const getRecommend = async (request, response) => {
  try {
    const recommend = await Recommend.find().lean();

    if (!recommend) {
      return response.status(400).json({ message: "No request list found!!" });
    }
    response.json(recommend);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

//get single Request List
const getSingleRecommend = async (request, response) => {
  const id = request.params.id;
  console.log(`single requestlist id ${id}`);

  let singleRecommend;

  try {
    singleRecommend = await Recommend.findOne({ _id: id });
    response.status(200).json(singleRecommend);
  } catch (error) {
    response.status(401).json(error);
  }
};

//Add RequestList
const registerRecommend = async (req, res) => {
  const { requestId, orderId, description } = req.body;

  console.log(req.body);
  try {
    //See if user Exist
    let user = await Recommend.findOne({ rid });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Recommend already exist" }] });
    }

    //create a RequestList instance
    user = new Recommend({
      requestId,
      orderId,
      description,
    });

    await user.save();

    res.json(user);
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const updateRecommend = async (request, response) => {
  const { requestId, orderId, description } = request.body;

  console.log(request.body);

  if (!requestId || !orderId || !description ) {
    return response.status(400).json({ message: "All fields are required" });
  }

  //confirm RequestList exist to update
  const recommend = await Recommend.findById(_id).exec();

  if (!recommend) {
    return response.status(400).json({ message: "Recommend not found!!" });
  }

  recommend.requestId = requestId;
  recommend.orderId = orderId;
  recommend.description = description;

  const updateRecommend = await recommend.save();
  response.json(`'${updateRecommend.recommend}' updated!`);
};

const deleteRecommend = async (request, response) => {
  try {
    const id = request.params.id;

    await Recommend.findByIdAndDelete(id)
      .then(() => {
        response.status(200).json({ message: "Recommend Deleted" });
      })
      .catch((error) => {
        //confirm data
        if (!id)
          return response.status(400).json({ message: "Order not found!!" });
        else
          response.json({
            message: "Error with delete item ",
            error: error.message,
          });
      });
  } catch (error) {
    response.json({ message: error.message });
  }
};

module.exports = {
  getRecommendById,
  getRecommend,
  registerRecommend,
  getSingleRecommend,
  updateRecommend,
  deleteRecommend,
};
