const express = require("express");
const router = express.Router();
const { getUsers, register, login } = require("../controllers/userController");

router.route("/").get(getUsers);
router.route("/register").post(register);
router.route("/login").post(login);
// router.route("/:id/update").put(updateUser);

module.exports = router;
