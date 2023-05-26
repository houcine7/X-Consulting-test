// db model of reviews

const Review = require("../models/reviews");

// function to get the list of reviews
const getReviews = async (req, res, next) => {
  //
  try {
    console.log("........");
    const reviewsList = await Review.findAll();
    console.log(reviewsList);
    res.status(200).json({ reviews: reviewsList });
  } catch (error) {
    error.status = 404;

    next(error);
  }
};

module.exports = {
  getReviews,
};
