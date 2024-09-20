const jwt = require("jsonwebtoken");
const verifyIsLoggedin = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decode = jwt.verify(token, process.env.jwt_secret_key);
      req.user = decode;
      next();
    } catch (err) {
      return res.status(401).send("invalid token.Unautherised acess");
    }
  } catch (err) {
    next(err);
  }
};
const verifyIsAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(401).send("Unautherised access");
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { verifyIsLoggedin, verifyIsAdmin };
