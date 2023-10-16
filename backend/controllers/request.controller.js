// const bcrypt = require("bcryptjs");
const { request, response } = require("express");
const RequestList = require("../models/Request.model");
// const jwt = require("jsonwebtoken");
const config = require("config");

//get Request List details by id
const getRequestListDetailsById = async ( request, response ) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await RequestList.findById(request.params.id).select("-rid");

    response.json(user);
  } catch (err) {
    console.log(err.message);
    response.status(500).send("Server Error");
  }
};



//get RequestList List
const getRequestList = async (request, response) => {

  try {
    const requestlists = await RequestList.find().lean();

    if( !requestlists) {
      return response.status(400).json({ message: 'No request list found!!'})
    }
    response.json(requestlists);

  } catch ( error ) {

    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

//get single Request List
const getSingleRequestList = async ( request, response ) => {
  const id = request.params.id;
  console.log(`single requestlist id ${id}`);

  let singleRequestList;

  try {
    singleRequestList = await RequestList.findOne({ _id: id});
    response.status(200).json(singleRequestList);
  } catch ( error ) {
    response.status(401).json(error);
  }
}



//Add RequestList
const registerRequestList = async (req, res) => {
  const { site, rid, oid, tbudget, abudget, state } = req.body;

  console.log(req.body);
  try {
    //See if user Exist
    let user = await RequestList.findOne({ rid });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Request List already exist" }] });
    }

    //create a RequestList instance
    user = new RequestList({
      site,
      rid,
      oid,
      tbudget,
      abudget,
      state,
    });

    
    await user.save();

    res.json(user);
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};



const updateRequestListDetails = async ( request, response ) => {
  const{
    site,
    rid,
    oid,
    tbudget,
    abudget,
    state
  } = request.body;

  console.log(request.body);

  if( !site || !rid || !oid || !tbudget || !abudget || !state) {
    return response.status(400).json({ message: 'All fields are required'});
  }

  //confirm RequestList exist to update
  const requestlist = await RequestList.findById(_id).exec();

  if( !requestlist ) {
    return response.status(400).json({ message: 'RequestList not found!!'});
  }

  requestlist.site = site;
  requestlist.rid = rid;
  requestlist.oid = oid;
  requestlist.tbudget = tbudget;
  requestlist.abudget = abudget;
  requestlist.state = state;

  const updateRequestList = await requestlist.save();
  response.json(`'${updateRequestList.requestlist}' updated!`);
}

const deleteRequestList = async ( request, response ) => {
  try{
    const id = request.params.id;

    await RequestList.findByIdAndDelete( id ) 
    .then(() => {
      response.status(200).json({ message: 'Order Deleted'});
    }).catch(( error ) => {

      //confirm data
      if( !id ) 
        return response.status(400).json({ message: 'Order not found!!'})
      else
        response.json({ message: 'Error with delete item ', error: error.message});
      
    });
  } catch ( error ) {
    response.json({ message: error.message});
  }
}



module.exports = {
  getRequestListDetailsById,
  getRequestList,
  registerRequestList,
  getSingleRequestList,
  updateRequestListDetails,
  deleteRequestList
};
