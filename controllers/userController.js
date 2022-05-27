const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const generateToken = require("../utils/generateToken");

// @desc Get All users
// @route GET /api/users
// @access protecd amdin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("Not Found Users");
  }
});

// @desc Update user
// @route PUT /api/users/:id/update
// @access protect admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const updateUser = await user.update({ ...req.body });
  res.json(updateUser);
});

// @desc Delete user
// @route DELTE /api/users/:id/delete
// @access protect admin
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteUser = await User.destroy({ where: { id } });

  if (deleteUser) {
    res.json(`Delete User id: ${id} success`);
  } else {
    res.status(404);
    throw new Error(`Not found user id:${id}`);
  }
});

// @desc Register
// @route POST /api/users/register
// @access public
const register = asyncHandler(async (req, res) => {
  const userAlredy = await User.findAll({ where: { email: req.body.email } });

  if (userAlredy.length === 0) {
    const user = await User.create(req.body);
    res.json({
      id: user.id,
      name: user.firstname,
      token: generateToken(user.id),
    });
  } else {
    res.status(409);
    throw new Error("This user is alredy");
  }
});

// @desc login
// @route POST /api/users/login
// @access protect
const login = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  if (user) {
    if (await user.comparePassword(password)) {
      res.json({
        id: user.id,
        user: user.firstname,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Password");
    }
  } else {
    res.status(404);
    throw new Error("Not found User");
  }
});

module.exports = { getUsers, updateUser, deleteUser, register, login };
