const express = require("express");
const router = express.Router();
const tvController = require("../controllers/tvController");

router.get("/trending", tvController.getTrendingTV);
router.get("/genre", tvController.getTvByGenre);

module.exports = router;
