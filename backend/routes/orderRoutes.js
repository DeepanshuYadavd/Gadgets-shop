const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedin,
  verifyIsAdmin,
} = require("../middlewares/verifyAuthToken");
const {
  getUserOrders,
  getOrdersDetails,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAdminOrders,
  getOrderForAnalysis,
} = require("../controllers/orderController");

// users routes:
router.use(verifyIsLoggedin);
router.get("/", getUserOrders);
router.get("/user/:id", getOrdersDetails);
router.post("/", createOrder);
router.put("/paid/:id", updateOrderToPaid);

// admin  routes:
router.use(verifyIsAdmin);
router.put("/delivered/:id", updateOrderToDelivered);
router.get("/admin", getAdminOrders);
router.get("/analysis/:date", getOrderForAnalysis);
module.exports = router;
