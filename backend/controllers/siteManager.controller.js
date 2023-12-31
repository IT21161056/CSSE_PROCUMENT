// const bcrypt = require("bcryptjs");
const SiteManager = require("../models/SiteManager.model");
// const jwt = require("jsonwebtoken");
const config = require("config");
const Site = require("../models/Site.model");

//get Site Manager details
const getSiteManagerDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await SiteManager.findById(req.user.id)
      .select("-password")
      .populate({
        path: "siteList",
      });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Get Order List Of Site Manager
const getOrderListOfSiteManager = async (req, res) => {
  try {
    const orderList = await Order.find({ site: "61571f3b0a910a199d125e12" });
    res.json(orderList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Site Manager details
const getSiteManagerSiteList = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await SiteManager.findById(req.user.id)
      .select("siteList")
      .populate({
        path: "siteList",
      });
    res.json(user.siteList);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Authenticate admin and get token
const loginSiteManager = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await SiteManager.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    if (user && user.password != password) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //match the user email and password

    // const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //   return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    // }

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
    res.send("Successfully logged in");
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Register Site Manager
const registerSiteManager = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //See if user Exist
    let user = await SiteManager.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Site Manager already exist" }] });
    }

    //create a Site Manager instance
    user = new SiteManager({
      name,
      email,
      password,
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
    res.json({ message: "User created successfully!" });
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//get all site managers

const getAllSiteManagers = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await SiteManager.find().select("-password");
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getSiteManagerDetails,
  loginSiteManager,
  registerSiteManager,
  getAllSiteManagers,
  getSiteManagerSiteList,
  getOrderListOfSiteManager,
};
