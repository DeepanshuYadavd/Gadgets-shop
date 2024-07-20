const connectDB = require("../config/db");
connectDB();

// import data:
const categoryData = require("./categoryData");
const productData = require("./productData");
const reviewData = require("./reviewData");
const usersData = require("./UserData");
const ordersData = require("./ordersData");

// import models:
const Category = require("../models/categoryModel");
const products = require("../models/productModel");
const Review = require("../models/reviewsModel");
const user = require("../models/usermodel");
const orders = require("../models/ordersModel");

const importData = async () => {
  try {
    // category data
    await Category.collection.deleteMany({});
    await Category.insertMany(categoryData);

    // productData:
    await products.collection.deleteMany({});

    // reviewData:
    await Review.collection.deleteMany({});
    const reviewd = await Review.insertMany(reviewData);

    // reviews add to specific product:
    const sampleProduct = productData.map((product) => {
      reviewd.map((review) => {
        product.review.push(review);
      });
      return { ...product };
    });
    await products.insertMany(sampleProduct);

    //  userData:
    await user.collection.deleteMany({});
    await user.insertMany(usersData);

    // orders data:
    await orders.collection.deleteMany({});
    await orders.insertMany(ordersData);
    process.exit();
  } catch (err) {
    console.error(err.message);
  }
};
importData();
