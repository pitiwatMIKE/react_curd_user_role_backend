const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const generateToken = require("../utils/generateToken");

// @desc Get All users
// @route GET /api/users
// @acess public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("Not Found Users");
  }
});

// // @desc Update user
// // @route PUT /api/users/:id/update
// // @access public
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findByPk(req.params.id);
//   const updateUser = await user.update({ ...req.body });
//   res.json(updateUser);
// });

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
// @access private
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

module.exports = { getUsers, register, login };
