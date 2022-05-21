//  Require dependencies
const User = require("../models/user.model");
const { successResMsg, errorResMsg } = require("../utils/response");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

//  creating  a user
//  creating  Admin
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    // validating phoneNumber
    const phoneNumberExist = await User.findOne({ phoneNumber });
    if (phoneNumberExist) {
      return res.status(401).json({
        message: "phoneNumber exists, please login",
      });
    }
    // validating email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(401).json({
        message: "email exists, please login",
      });
    }
    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // create  a new Admin
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
    });
    const payload = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = await jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    return successResMsg(res, 201, {
      message: "User  created",
      newUser,
      token,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// logging in a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(401).json({
        message: "email does not exist, please create an account",
      });
    }
    let isPasswordExist = await bcrypt.compare(password, emailExist.password);
    if (!isPasswordExist) {
      return res.status(401).json({
        message: "credientials Not Correct",
      });
    }
    const data = {
      id: emailExist._id,
      email: emailExist.email,
      role: emailExist.role,
    };

    const token = await jwt.sign(data, process.env.SECRET_TOKEN);
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//   exporting modules
module.exports = { createUser, loginUser };
