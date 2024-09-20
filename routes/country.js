const express = require("express");
const router = express.Router();
const {
  getAvailableCountries,
  getCountryInfoByCode,
} = require("../controllers/countryControllers");

router.use("/availableCountries", getAvailableCountries);

router.use("/countryInfo/:countryCode", getCountryInfoByCode);

module.exports = router;
