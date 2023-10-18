const Site = require("../models/Site.model");

/*
@method POST
*/
const createSite = async (req, res) => {
  const {
    siteName,
    siteAddress,
    siteContactNumber,
    siteManager,
    allocatedBudget,
  } = req.body;

  if (
    !siteName ||
    !siteAddress ||
    !siteContactNumber ||
    !siteManager ||
    !allocatedBudget
  ) {
    return res.send("All fields are required!");
  }

  const site = new Site({
    siteName,
    siteAddress,
    siteContactNumber,
    siteManager,
    allocatedBudget,
  });

  await site
    .save()
    .then(() => {
      res.status(200).send("Site successfully created");
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};

const getSiteById = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.send("Site id is undefined!");

  const site = Site.findById(req.params.id);

  if (!site) return res.send("Site not found!");

  res.json(site);
};

const getAllSites = async (req, res) => {
  try {
    const siteList = await Site.find();

    if (!siteList) return res.send("There are no sites!");

    res.json(siteList);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updatAllocatedBudget = async (req, res) => {
  try {
    
    const { totalPrice, siteid } = req.body;

    const existingSite = await Site.findById({ _id: siteid });

    if (!existingSite) return res.send("No site found!");

    existingSite.allocatedBudget = existingSite - totalPrice;

    existingSite.save();

    res.send("Budget update successfull!");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createSite,
  getSiteById,
  getAllSites,
  updatAllocatedBudget,
};
