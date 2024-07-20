const express = require("express");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const app = express();

// api request for getting token from cookies and send it to frontend:
const jwt = require("jsonwebtoken");
// delete token from cookie for logout:
app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");

  // note : this api request is hit inside redux action and action is dispatched when we click on logout button.by thus we can clear the data of user store in redux or also remove the data from the local storage.
});

// get token to check user logged in or not:
app.get("/get-token", (req, res) => {
  try {
    const accessToken = req.cookies.access_token;
    const decoded = jwt.verify(accessToken, process.env.jwt_secret_key);
    return res.json({
      token: decoded.firstName,
      verifyIsAdmin: decoded.isAdmin,
    });
  } catch (err) {
    return res
      .status(401)
      .send(
        "Unauthorized.you are our respected user not admin or token is not present"
      );
  }
});

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
