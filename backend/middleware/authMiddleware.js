const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401).json({
        status: "fail",
        message: "Not authorized, token failed",
      });
      //   throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "Not authorized, token failed",
    });
  }
});
