//Load environment variables
require("dotenv").config();
const express = require("express");

const reviewsRouter = require("./routes/reviews");

// express app initialization
const app = express();
//Midelwares
app.use(express.json());
app.use("/api/v1/reviews", reviewsRouter);

//global error handler middelwared
app.use((err, req, res, next) => {
  // error infos :
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
