const express = require("express");
const router = express.Router();
const { protect, permit } = require("../middlewares/authMiddleware");
const {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("../controllers/productController");
const { USER, ADMIN } = require("../constants/roleConstants");

router.get("/products", (req, res) => {
  res.send("get all products");
});

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);
router.route("/create").post(protect, permit(USER, ADMIN), createProduct);
router.route("/:id/update").put(protect, permit(USER, ADMIN), updateProduct);
router.route("/:id/delete").delete(protect, permit(USER, ADMIN), deleteProduct);

module.exports = router;
