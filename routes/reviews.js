var express = require("express");
var router = express.Router();
var reviewsCtrl = require("../controllers/reviews");

/* GET reviews listing. */
router.get("/", reviewsCtrl.getReview);

router.post("/new", reviewsCtrl.createReview);

module.exports = router;
