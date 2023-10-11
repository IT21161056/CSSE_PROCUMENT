const Site = require("../models/Site.model");

/*
@method POST
*/
const createSite = async (req, res) => {
  const { siteName, siteAddress, siteContactNumber, siteManager } = req.body;

  if (!siteName || !siteAddress || !siteContactNumber || !siteManager) {
    return res.send("All fields are required!");
  }

  const site = new Site({
    siteName,
    siteAddress,
    siteContactNumber,
    siteManager,
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

module.exports = {
  createSite,
  getSiteById,
  getAllSites,
};
