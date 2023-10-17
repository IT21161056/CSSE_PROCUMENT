const { request, response } = require("express");
const RecommendsModel = require("../models/Recommends.model");
const config = require("config");

//get Request List details by id
const getRecommendDetailsById = async (request, response) => {
  try {
    const user = await RecommendsModel.findById(request.params.id).select(
      "-requestId"
    );
    response.json(user);
  } catch (err) {
    console.log(err.message);
    response.status(500).send("Server Error");
  }
};

//get RequestList List
const getRecommend = async (request, response) => {
  try {
    const recommendsmodels = await RecommendsModel.find().lean();

    if (!recommendsmodels) {
      return response.status(400).json({ message: "No recommended change found!!" });
    }
    response.json(recommendsmodels);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

// get single Request List
const getSingleRecommend = async (request, response) => {
  const id = request.params.id;
  console.log(`single recommend id ${id}`);

  let singleRecommend;

  try {
    singleRecommend = await RecommendsModel.findOne({ _id: id });
    response.status(200).json(singleRecommend);
  } catch (error) {
    response.status(401).json(error);
  }
};

// Add Recommend
const registerRecommend = async (req, res) => {
  const { requestId, orderId, description} = req.body;

  console.log(req.body);
  try {
    //create a Recommand instance
    user = new RecommendsModel({
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

// const updateRecommend = async (request, response) => {
//   const { requestId, orderId, description } = request.body;

//   console.log(request.body);

//   if (
//     !requestId ||
//     !orderId ||
//     !description 
//   ) {
//     return response.status(400).json({ message: "All fields are required" });
//   }

//   //confirm RequestList exist to update
//   const recommendsmodels = await RecommendsModel.findById(_id).exec();

//   if (!recommendsmodels) {
//     return response.status(400).json({ message: "Recommend not found!!" });
//   }

//   recommendsmodels.requestId = requestId;
//   recommendsmodels.orderId = orderId;
//   recommendsmodels.description = description;

//   const updateRecommendsModel = await recommendsmodels.save();
//   response.json(`'${updateRecommendsModel.recommendsmodel}' updated!`);
// };

const updateRecommend = async (request, response) => {
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

const deleteRecommend = async (request, response) => {
  try {
    const id = request.params.id;

    await RecommendsModel.findByIdAndDelete(id)
      .then(() => {
        response.status(200).json({ message: "Recommend Deleted" });
      })
      .catch((error) => {
        //confirm data
        if (!id)
          return response.status(400).json({ message: "Recommend not found!!" });
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
  getRecommendDetailsById,
  getRecommend,
  getSingleRecommend,
  registerRecommend,
  updateRecommend,
  deleteRecommend,
};
