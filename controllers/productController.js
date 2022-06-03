const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Product } = require("../models");

const getProducts = asyncHandler(async (req, res) => {
  let pageSize = 8;
  let page = req.query.page || 1;
  let keyword = req.query.search || null;
  let condition = keyword ? { name: { [Op.substring]: keyword } } : {};

  let { rows, count } = await Product.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    where: condition,
    offset: pageSize * (page - 1),
    limit: pageSize,
  });

  count = Math.ceil(count / pageSize);

  if (rows) {
    res.json({ products: rows, maxPage: count });
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

// @desc get my Products
// @route GET /api/products/myproducts
// @access protect
const getMyProducts = asyncHandler(async (req, res) => {
  let pageSize = 5;
  let page = req.query.page || 1;
  let condition = { userId: req.user.id };

  let { rows, count } = await Product.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    where: condition,
    offset: pageSize * (page - 1),
    limit: pageSize,
  });

  maxPage = Math.ceil(count / pageSize);
  let myProducts = rows;

  if (myProducts) {
    res.json({ myProducts, maxPage });
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

// @desc Create my Product
// @route POST /api/product/create
// @access protect
const createMyProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({ ...req.body, userId: req.user.id });
  res.json(product);
});

// @desc Update my Product
// @route PUT /api/product/:id/updatemyproduct
// @access protect
const updateMyProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ where: { id, userId: req.user.id } });

  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  } else {
    const updateProduct = await product.update({ ...req.body });
    res.json(updateProduct);
  }
});

// @desc Delete My Product
// @route DELETE /api/products/:id/deletemyproducts
// @acess protect
const deleteMyProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteProduct = await Product.destroy({
    where: { id, userId: req.user.id },
  });
  if (deleteProduct) {
    res.json(`Delete Product id:${id} success`);
  } else {
    res.status(404);
    throw new Error(`Product id:${id} Not Found`);
  }
});

// @desc get products of each user
// @route GET /api/products/:userid/userproducts
// @access protect admin
const getUserProducts = asyncHandler(async (req, res) => {
  let pageSize = 5;
  let page = req.query.page || 1;
  let condition = { userId: req.params.userid };

  let { rows, count } = await Product.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    where: condition,
    offset: pageSize * (page - 1),
    limit: pageSize,
  });

  maxPage = Math.ceil(count / pageSize);
  let userProducts = rows;

  if (userProducts) {
    res.json({ userProducts, maxPage });
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

// @desc Update Product
// @route PUT /api/product/:id/update
// @access protect admin
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  const updateProduct = await product.update({ ...req.body });
  res.json(updateProduct);
});

// @desc Delete Product
// @route DELETE /api/products/:id/delete
// @acess protect admin
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
  createMyProduct,
  updateProduct,
  getMyProducts,
  updateProduct,
  updateMyProduct,
  deleteMyProduct,
  getUserProducts,
};
