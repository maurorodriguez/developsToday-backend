const express = require("express");
const router = express.Router();
const countryRouter = require("./country")

router.use("/country", countryRouter);

module.exports = router;