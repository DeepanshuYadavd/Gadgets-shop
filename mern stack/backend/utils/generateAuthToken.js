const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, firstName, lastName, email, isAdmin) => {
  return jwt.sign(
    {
      _id,
      firstName,
      lastName,
      email,
      isAdmin,
    },
    process.env.jwt_secret_key,
    {
      expiresIn: "10h",
    }
  );
};
module.exports = { generateAuthToken };
