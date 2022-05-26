const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/productController");

router.get("/products", (req, res) => {
  res.send("get all products");
});

router.route("/").get(getProducts);


module.exports = router;
