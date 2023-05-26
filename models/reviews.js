const sequelize = require("../config/configDb");

const { DataTypes } = require("sequelize");

const Review = sequelize.define("reviews", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  appID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appStoreName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  countryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewHeading: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reviewText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reviewUserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Review;
