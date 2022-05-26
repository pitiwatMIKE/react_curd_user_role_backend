const asyncHandler = require("express-async-handler");
const { Product } = require("../models");

// @desc Get All Product
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res, next) => {
  let products = await Product.findAll();

  if (products) {
    res.send(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

module.exports = { getProducts };
