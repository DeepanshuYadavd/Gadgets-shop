const express = require("express");
const router = express.Router();
const {
  getCategories,
  newCategory,
  deleteCategory,
  saveAttr,
} = require("../controllers/categoryController");

const {
  verifyIsLoggedin,
  verifyIsAdmin,
} = require("../middlewares/verifyAuthToken");
router.get("/", getCategories);

// middlewares:
router.use(verifyIsLoggedin);
router.use(verifyIsAdmin);

router.post("/", newCategory);
router.delete("/:category", deleteCategory);
router.post("/attr", saveAttr);

module.exports = router;
