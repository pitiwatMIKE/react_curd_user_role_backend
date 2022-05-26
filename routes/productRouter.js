const express = require("express");
const router = express.Router();
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
router.route("/create").post(createProduct);
router.route("/:id/update").put(updateProduct);
router.route("/:id/delete").delete(deleteProduct);

module.exports = router;
