//Load environment variables
require("dotenv").config();
const express = require("express");
const Review = require("./models/reviews");

const reviewsRouter = require("./routes/reviews");

// express app initialization
const app = express();

//routes
app.use("/api/v1/reviews", reviewsRouter);

//error handler middelwared
app.use((err, req, res, next) => {
  // error infos :

  console.log("heeere");
  const errStatus = err.status || 500;
  const errMsg = err.message || "somthing went wrong";

  // return error response :
  return res.status(errStatus).json({
    success: false,
    message: errMsg,
  });
});

//server listening :
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server listening on port :" + port);
});
