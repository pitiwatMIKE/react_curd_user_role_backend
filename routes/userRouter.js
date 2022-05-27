const express = require("express");
const { ADMIN } = require("../constants/roleConstants");
const router = express.Router();
const {
  getUsers,
  updateUser,
  register,
  login,
  deleteUser,
} = require("../controllers/userController");
const { protect, permit } = require("../middlewares/authMiddleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(protect, permit(ADMIN), getUsers);
router.route("/:id/update").put(protect, permit(ADMIN), updateUser);
router.route("/:id/delete").delete(protect, permit(ADMIN), deleteUser);
module.exports = router;
