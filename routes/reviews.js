const express = require("express");
const { getReviews } = require("../controllers/reviews");

//router for reviews : handel routes related reviews
const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews);

module.exports = reviewsRouter;
