// db model of reviews
const { Op } = require("sequelize");
const Review = require("../models/reviews");

// function to get the list of reviews
const getReviews = async (req, res, next) => {
  //
  try {
    const reviewsList = await Review.findAll();
    // format the reviews json response

    if (reviewsList.length === 0) {
      const err = new Error("No reviews found");
      err.status(404);
      throw err;
    }

    res.status(200).json({ reviews: reviewsList });
  } catch (error) {
    next(error);
  }
};

// function to get the list of reviews by page
const getReviewsByPages = async (req, res, next) => {
  //
  try {
    const { offset, limit } = req.query;
    // specify the size of fetched page : starting from offset and ends at offset
    const reviewsList = await Review.findAll({
      offset: Number(offset) || 0,
      limit: Number(limit) || 5,
    });

    if (reviewsList.length === 0) {
      const err = new Error("No reviews found");
      err.status(404);
      throw err;
    }
    // format the reviews json response
    res.status(200).json({ reviews: reviewsList });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

//function that filters reviews by : rating,appSearch,countryName,appStoreName
const filterReviews = async (req, res, next) => {
  try {
    const { appID, appStoreName, rating, countryName } = req.query;

    console.log(
      appID + "  appStoreName",
      appStoreName + " rating" + rating + "  countryName" + countryName
    );

    const filtredReviews = await Review.findAll({
      // thes brings into consideration if the query parameters are undefined
      where: {
        ...(appID && { appID }),
        ...(countryName && { countryName }),
        ...(rating && { rating }),
        ...(appStoreName && { appStoreName }),
      },
    });

    if (filtredReviews.length == 0) {
      const err = new Error("No reviews found ");
      err.status = 404;
      throw err;
    } else {
      res.status(200).json({ reviews: filtredReviews });
    }
  } catch (err) {
    next(err);
  }
};

// function to search review based on the review heading and review text;

const searchReviews = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      const err = new Error("Please provide a query to search for reviews");
      err.status = 400;
      next(err);
    } else {
      /*
            find all reviews that have a recview text or review 
            heading that contains the query (lowercase or uppercase )
        */

      const searchedReviews = await Review.findAll({
        where: {
          [Op.or]: [
            { reviewText: { [Op.like]: `%${query}%` } },
            { reviewHeading: { [Op.like]: `%${query}%` } },
          ],
        },
      });

      //no reviews found
      if (searchedReviews.length == 0) {
        const err = new Error("No reviews found ");
        err.status = 404;
        throw err;
      }
      // send response
      return res.status(200).json({ reveiws: searchedReviews });
    }
  } catch (error) {
    next(error);
  }
};

// to add reviews to test to db
const addReview = async (req, res, next) => {
  try {
    // review to add
    const reviewToAdd = req.body;
    const reviewAdded = await Review.create(reviewToAdd);
    //
    return res.status(201).json({
      success: true,
      message: "review added successfully",
      data: reviewAdded,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getReviews,
  filterReviews,
  searchReviews,
  addReview,
  getReviewsByPages,
};
