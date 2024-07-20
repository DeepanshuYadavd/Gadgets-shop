const orders = require("../models/ordersModel");
const products = require("../models/productModel");
const ObjectId = require("mongodb").ObjectId;
// get user orders:
const getUserOrders = async (req, res, next) => {
  try {
    const order = await orders.find({ user: new ObjectId(req.user._id) });
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
// get order details of particuler order:
const getOrdersDetails = async (req, res, next) => {
  try {
    const orderDetails = await orders
      .findById(req.params.id)
      .populate("user", "-password -isAdmin -createdAt -updatedAt -__v");
    return res.status(200).json(orderDetails);
  } catch (err) {
    next(err);
  }
};
// create an order placed by  particular user:
const createOrder = async (req, res, next) => {
  try {
    const { orderTotal, cartItems, paymentMethod } = req.body;
    if (!(orderTotal && cartItems && paymentMethod)) {
      return res.status(400).send("All inputs are required");
    }
    const createdOrder = await orders.create({
      user: new ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
    });
    let idx = cartItems.map((item) => {
      return item.productId;
    });
    let qty = cartItems.map((item) => {
      return Number(item.quantity);
    });

    await products.find({ _id: { $in: idx } }).then((products) => {
      products.forEach(function (product, idx) {
        product.sales += qty[idx];
        product.save();
      });
      return res.status(201).json(createdOrder);
    });
  } catch (err) {
    next(err);
  }
};

// update order when user pay the amount :
const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await orders.findById(req.params.id).orFail();
    order.isPaid = true;
    order.paidAt = new Date();
    const paidOrder = await order.save();
    return res.status(200).json(paidOrder);
  } catch (err) {
    next(err);
  }
};
// admin mark delivered ,when order is delivered:
const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await orders.findById(req.params.id).orFail();
    order.isDelivered = true;
    order.DeliveredAt = new Date();
    const deliveredOrder = await order.save();
    return res.status(200).json(deliveredOrder);
  } catch (err) {
    next(err);
  }
};
// get all users at admin panel:
const getAdminOrders = async (req, res, next) => {
  try {
    const allorder = await orders
      .find({})
      .populate("user", "-password")
      .sort({ paymentMethod: "desc" })
      .orFail();
    return res.status(200).json(allorder);
  } catch (err) {
    next(err);
  }
};
// get orders for analyses:
const getOrderForAnalysis = async (req, res, next) => {
  try {
    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.params.date);
    end.setHours(23, 59, 59, 999);

    const order = await orders
      .find({
        createdAt: {
          $gte: start,
          $lte: end,
        },
      })
      .sort({
        createdAt: "asc",
      });
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getUserOrders,
  getOrdersDetails,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAdminOrders,
  getOrderForAnalysis,
};
