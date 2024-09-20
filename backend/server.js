const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");
const handleError = require("./controllers/errorhandling/error");
require("dotenv").config();
const app = express();

// const port = 3000;
// express check json data
app.use(express.json());
// express check the file data:
app.use(fileUpload());
// express check the cookie data:
app.use(cookieParser());
// all api request will handle here:
app.use("/api", apiRoutes);

// error handling:
app.use(handleError);

// database connection:
connectDB();

// server live at this port:
app.listen(process.env.PORT, () => {
  console.log("connected to server at " + process.env.PORT + " port");
});
