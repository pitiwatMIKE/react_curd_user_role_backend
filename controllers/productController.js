const asyncHandler = require("express-async-handler");
const { Product } = require("../models");

// @desc Get All Product
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res, next) => {
  let products = await Product.findAll();

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

// @desc Get Product from :id
// @route GET /api/products/:id
// @acess public
const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`Product id:${id} Not Found`);
  }
});

// @desc Create Product
// @route POST /api/product/create
// @access public
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({ ...req.body, userId: req.user.id });
  res.json(product);
});

// @desc Update Product
// @route PUT /api/product/:id/update
// @access public
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  const updateProduct = await product.update({ ...req.body });
  res.json(updateProduct);
});

// @desc Delete Product
// @route DELETE /api/products/:id/delete
// @acess public
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteProduct = await Product.destroy({ where: { id: id } });
  if (deleteProduct) {
    res.json(`Delete Product id:${id} success`);
  } else {
    res.status(404);
    throw new Error(`Product id:${id} Not Found`);
  }
});

module.exports = {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};
