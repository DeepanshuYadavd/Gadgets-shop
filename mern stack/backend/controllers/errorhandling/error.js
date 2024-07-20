require("dotenv").config();
const handleError = (error, req, res, next) => {
  // console.error(error)
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = handleError;
