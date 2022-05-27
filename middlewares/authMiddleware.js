const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = asyncHandler(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findOne({
        where: { id: decode.id },
        attributes: { exclude: ["password"] },
      });
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized, token faild");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
