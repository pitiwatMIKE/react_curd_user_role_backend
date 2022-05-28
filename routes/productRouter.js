const express = require("express");
const router = express.Router();
const { protect, permit } = require("../middlewares/authMiddleware");
const { USER, ADMIN } = require("../constants/roleConstants");
const {
  getProducts,
  getProduct,
  deleteProduct,
  createMyProduct,
  updateProduct,
  getMyProducts,
  updateMyProduct,
  deleteMyProduct,
  getUserProducts,
} = require("../controllers/productController");
const res = require("express/lib/response");
const { uploadImage } = require("../middlewares/uploadImageMidleware");

router.route("/").get(getProducts);
router.route("/myproducts").get(protect, permit(USER, ADMIN), getMyProducts);
router.route("/:id").get(getProduct);
router
  .route("/create")
  .post(protect, permit(USER, ADMIN), uploadImage, createMyProduct);
router
  .route("/:id/updatemyproduct")
  .put(protect, permit(USER, ADMIN), uploadImage, updateMyProduct);
router
  .route("/:id/deletemyproduct")
  .delete(protect, permit(USER, ADMIN), deleteMyProduct);

// for admin
router
  .route("/:userid/getuserproducts")
  .get(protect, permit(ADMIN), getUserProducts);
router
  .route("/:id/update")
  .put(protect, permit(ADMIN), uploadImage, updateProduct);
router.route("/:id/delete").delete(protect, permit(ADMIN), deleteProduct);

module.exports = router;
