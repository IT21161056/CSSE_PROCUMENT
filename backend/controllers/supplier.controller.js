// const bcrypt = require("bcryptjs");
const { request, response } = require("express");
const Supplier = require("../models/Supplier.model");
// const jwt = require("jsonwebtoken");
const config = require("config");

//get Supplier details by id
const getSupplierDetailsById = async ( request, response ) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Supplier.findById(request.params.id).select("-password");

    response.json(user);
  } catch (err) {
    console.log(err.message);
    response.status(500).send("Server Error");
  }
};

//Accepted Orders or Completed Orders For Each Supplier
const getAcceptedOrCompletedOrdersForEachSupplier = async (req, res) => {
  try {
    const user = await Supplier.findById(req.params.id)
      .select("orderList")
      .populate({
        path: "orderList",
        match: { status: "accepted" || "completed" }, //filter status: "placed"
        populate: {
          path: "productList",
          populate: {
            path: "Product",
          },
        },
      });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//add new supplier

const addNewSupplier = async ( request, response ) => {
  const { supplierName, email, location, contactNumber, productList } = request.body;

  if ( !supplierName || !email || !location || !contactNumber || !productList || !orderList) {
    return response.status(400).json({ message: 'All fields are required'});
  }

  const supplier = await Supplier.create({
    supplierName,
    email,
    location,
    contactNumber,
    productList,
  });

  if (supplier) {
    return response.status(201).json({ message: "New Supplier created" });
  } else {
    return request.status(400).json({ message: "Invalid supplier data recived" });
  }
}

//get Supplier List
const getSupplierList = async (request, response) => {

  try {
    const suppliers = await Supplier.find().lean();

    if( !suppliers) {
      return response.status(400).json({ message: 'No suppliers found!!'})
    }
    response.json(suppliers);

  } catch ( error ) {

    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

//get single supplier
const getSingleSupplier = async ( request, response ) => {
  const id = request.params.id;
  console.log(`single supplier id ${id}`);

  let singleSupplier;

  try {
    singleSupplier = await Supplier.findOne({ _id: id});
    response.status(200).json(singleSupplier);
  } catch ( error ) {
    response.status(401).json(error);
  }
}

//Authenticate Supplier and get token
const loginSupplier = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await Supplier.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //match the user email and password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Register Supplier
const registerSupplier = async (req, res) => {
  const { supplierName, email, location, contactNumber, productList } = req.body;

  console.log(req.body);
  try {
    //See if user Exist
    let user = await Supplier.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Supplier already exist" }] });
    }

    //create a Supplier instance
    user = new Supplier({
      supplierName,
      email,
      location,
      contactNumber,
      productList,
      orderList
    });

    //Encrypt Password

    //10 is enogh..if you want more secured.user a value more than 10
    // const salt = await bcrypt.genSalt(10);

    //hashing password
    // user.password = await bcrypt.hash(password, salt);

    //save user to the database
    await user.save();

    //Return jsonwebtoken

    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };

    // jwt.sign(
    //   payload,
    //   config.get("jwtSecret"),
    //   { expiresIn: 360000 },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
    res.json(user);
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const getSuppliersByProduct = async (req, res) => {
  try {
    // const { itemName } = req.body;
   const item = req.query.itemName 
    const suppliers = await Supplier.find({
      productList: {
        $elemMatch: { name: item },
      },
    });

    if (!suppliers) return res.send("No Matching Suppliers!");

    res.json(suppliers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const updateSupplierDetails = async ( request, response ) => {
  const{
    supplierName,
    email,
    location,
    contactNumber,
    productList
  } = request.body;

  console.log(request.body);

  if( !supplierName || !email || !contactNumber || !location || !productList) {
    return response.status(400).json({ message: 'All fields are required'});
  }

  //confirm supplier exist to update
  const supplier = await Supplier.findById(_id).exec();

  if( !supplier ) {
    return response.status(400).json({ message: 'Supplier not found!!'});
  }

  supplier.supplierName = supplierName;
  supplier.location = location;
  supplier.email = email;
  supplier.contactNumber = contactNumber;
  supplier.productList = productList;

  const updateSupplier = await supplier.save();
  response.json(`'${updateSupplier.supplier}' updated!`);
}

const deleteSupplier = async ( request, response ) => {
  try{
    const id = request.params.id;

    await Supplier.findByIdAndDelete( id ) 
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
  addNewSupplier,
  getSupplierList,
  loginSupplier,
  registerSupplier,
  getAcceptedOrCompletedOrdersForEachSupplier,
  getSupplierDetailsById,
  getSuppliersByProduct,
  updateSupplierDetails,
  deleteSupplier
};
