const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getBestSellers,
  adminGetProduct,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
} = require("../controllers/productController");
const { verifyIsLoggedin,verifyIsAdmin } = require("../middlewares/verifyAuthToken");

router.get("/", getProducts);
// product find on the basis of categoryName by searching :
router.get("/category/:categoryName", getProducts);

// searching routes:
router.get("/search/:searchQuery", getProducts);

// get best sellers:
router.get("/bestsellers", getBestSellers);

// get product by id:
router.get("/get-one/:id", getProductById);

// admin routes:
router.use(verifyIsLoggedin);
router.use(verifyIsAdmin)
router.get("/admin", adminGetProduct);
router.delete("/admin/:id", adminDeleteProduct);
router.post("/admin", adminCreateProduct);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminUpload);
router.delete("/admin/images/:imagePath/:productId", adminDeleteProductImage);

module.exports = router;
