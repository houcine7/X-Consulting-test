const express = require("express");

//
const {
  getReviews,
  filterReviews,
  searchReviews,
  addReview,
  getReviewsByPages,
} = require("../controllers/reviews");

//router for reviews : handel routes related reviews
const reviewsRouter = express.Router();

// fetch all data endpoint
reviewsRouter.get("/", getReviews);

// pages endpoint
reviewsRouter.get("/pages", getReviewsByPages);

reviewsRouter.get("/filter", filterReviews);

reviewsRouter.get("/search", searchReviews);

//Route to add review to db to test endpoints
reviewsRouter.post("/", addReview);

module.exports = reviewsRouter;
