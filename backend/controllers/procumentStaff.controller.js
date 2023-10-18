const ProcumentOfficer = require("../models/ProcumentOfficer");

const loginProcumentOfficer = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)
  try {
    //See if user Exist
    let user = await ProcumentOfficer.findOne({ email });

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
const registerProcumentOfficer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //See if user Exist
    let user = await ProcumentOfficer.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Site Manager already exist" }] });
    }

    //create a Site Manager instance
    user = new ProcumentOfficer({
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

module.exports = {
loginProcumentOfficer,
registerProcumentOfficer
};