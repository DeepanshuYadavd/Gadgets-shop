const users = require("../models/usermodel");
const Review = require("../models/reviewsModel");
const products = require("../models/productModel");
const { hashPassword, comparePassword } = require("../utils/hashedPassword");
const { generateAuthToken } = require("../utils/generateAuthToken");
// get user for admin:
const getUsers = async (req, res, next) => {
  try {
    const user = await users.find({}).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
//  user registration:
const registerUsers = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password)) {
      res.status(400).send("All fields are required!");
    }
    const userExist = await users.findOne({ email });
    if (userExist) {
      return res.status(400).send("email is already exist");
    } else {
      const user = await users.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashPassword(password),
      });
      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.firstName,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          message: "user created",
          createdUser: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};
// user log in :
const loginUsers = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    } else {
      const user = await users.findOne({ email });
      if (user && comparePassword(password, user.password)) {
        let cookieParams = {};
        if (!doNotLogout) {
          cookieParams = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          };
        } else {
          cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
        }
        res
          .cookie(
            "access_token",
            generateAuthToken(
              user._id,
              user.firstName,
              user.lastName,
              user.email,
              user.isAdmin
            ),
            cookieParams
          )
          .status(200)
          .json({
            message: "logged in Successfully",
            loggedUser: {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              isAdmin: user.isAdmin,
            },
          });
      } else {
        return res.status(401).send("wrong credential");
      }
    }
  } catch (err) {
    next(err);
  }
};
// update user profile:
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await users.findById(req.user._id).orFail();
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;

    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();
    res.status(200).json({
      success: "user Updated",
      updatedUser: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};
// get user profile:
const getUserProfile = async (req, res, next) => {
  try {
    const user = await users.findById(req.params.id).orFail();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
// review for product:
const writeReview = async (req, res, next) => {
  try {
    const session = await Review.startSession();
    const { comment, rating } = req.body;
    if (!(comment && rating)) {
      res.status(400).send("All inputs are required");
    }
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = new ObjectId();
    session.startTransaction();
    const reviews = await Review.create(
      [
        {
          _id: reviewId,
          comment: comment,
          rating: Number(rating),
          user: {
            _id: req.user._id,
            name: req.user.firstName + " " + req.user.lastName,
          },
        },
      ],
      { session: session }
    );
    // yha product find kiya hai but isme new review nahi fetch hoga kyunki vo iski agli
    // line wale code mai update ho rha hai. "product.review.push(reviewId)" is code se
    // review add ho jayega database mai but yha jo product fetch kiya hai usme nahi ayega
    // humne ye product rating and review number ko update krne ke liye find kiya hai:
    const product = await products
      .findById(req.params.id)
      .orFail()
      .populate("review")
      .session(session);

    // user can review a product only once:
    const alreadyReviewed = product.review.find(
      (item) => item.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("You reviewed already");
    }

    // update rating and review number of product schema:
    // jo product find kiya hai usme rating nahi hai thus firstly we have to push rating in it:
    let rev = [...product.review];
    rev.push({ rating: rating });
    product.review.push(reviewId);
    if (product.review.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      product.reviewsNumber = product.review.length;
      product.rating =
        rev
          .map((item) => item.rating)
          .reduce((sum, item) => {
            return sum + item;
          }, 0) / product.review.length;
    }
    await product.save();
    await session.commitTransaction();
    session.endsession;
    res.json(product);
  } catch (err) {
    await session.abortTransaction();
    next(err);
  }
};
// get user by id in admin panel to update it :
const getUserById = async (req, res, next) => {
  try {
    const user = await users
      .findById(req.params.id)
      .select("firstName lastName email isAdmin")
      .orFail();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
// update user by admin :
const updateUserByAdmin = async (req, res, next) => {
  try {
    const user = await users.findById(req.params.id).orFail();
    user.firstName = req.body.firstName || user.firstName;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    await user.save();
    return res.status(200).send("user updated");
  } catch (err) {
    next(err);
  }
};
// delete user by admin:
const deleteUserByAdmin = async (req, res, next) => {
  try {
    const user = await users.findById(req.params.id).orFail();
    await user.deleteOne({});
    res.status(200).send("user deleted");
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getUsers,
  registerUsers,
  loginUsers,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUserById,
  updateUserByAdmin,
  deleteUserByAdmin,
};
