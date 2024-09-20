const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedin,
  verifyIsAdmin,
} = require("../middlewares/verifyAuthToken");
const {
  getUsers,
  registerUsers,
  loginUsers,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUserById,
  updateUserByAdmin,
  deleteUserByAdmin,
} = require("../controllers/usersController");

router.post("/register", registerUsers);
router.post("/login", loginUsers);

// user route:
router.use(verifyIsLoggedin);
router.put("/profile", updateUserProfile);
router.get("/profile/:id", getUserProfile);
router.post("/review/product/:id", writeReview);

//  route for admin for getting user in their panel:
router.use(verifyIsAdmin);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserByAdmin);
router.delete("/:id", deleteUserByAdmin);

module.exports = router;
