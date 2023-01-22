const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
    if (user) {
      res.status(201).json({
        status: "success",
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        status: "success",
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    res.status(403).json({
      status: "fail",
      message: err.message,
    });
  }
};
