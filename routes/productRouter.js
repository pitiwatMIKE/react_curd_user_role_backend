const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/products", (req, res) => {
  res.send("get all products");
});

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);
router.route("/create").post(protect, createProduct);
router.route("/:id/update").put(protect, updateProduct);
router.route("/:id/delete").delete(protect, deleteProduct);

module.exports = router;
