//  Require dependencies

const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const { successResMsg, errorResMsg } = require("../utils/response");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

//  creating  Admin
const createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, role } =
      req.body;
    // validating phoneNumber
    const phoneNumberExist = await Admin.findOne({ phoneNumber });
    if (phoneNumberExist) {
      return res.status(401).json({
        message: "phoneNumber exists, please login",
      });
    }
    // validating email
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(401).json({
        message: "email exists, please login",
      });
    }
    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // create  a new Admin
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
      role,
    });
    const payload = {
      id: newAdmin._id,
      email: newAdmin.email,
      role: newAdmin.role,
    };
    const token = await jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    return successResMsg(res, 201, {
      message: "Admin  created",
      newAdmin,
      token,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

//  login for Admin
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await Admin.findOne({ email });
    if (!emailExist) {
      return res.status(401).json({
        message: "email does not exist, please create an account",
      });
    }
    const isPasswordExist = await bcrypt.compare(password, emailExist.password);
    if (!isPasswordExist) {
      return res.status(401).json({
        message: "credientials Not Correct",
      });
    }
    if (emailExist.role == "User") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const data = {
      id: emailExist._id,
      email: emailExist.phoneNumber,
      role: emailExist.role,
    };

    const token = await jwt.sign(data, process.env.SECRET_TOKEN);
    return res.status(200).json({
      success: true,
      message: "Admin login successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//  getting all Users
const getAUser = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const getUser = await User.findOne({ _id });
    if (!getUser) {
      return res.status(404).json({
        message: `This user does not exist.`,
      });
    }
    return res.status(200).json({
      getAUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//  counting all registered user
const countUsers = async (req, res, next) => {
  try {
    const usercount = await User.countDocuments();
    return res.status(200).json({
      usercount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//  exporting module
module.exports = {
  createAdmin,
  loginAdmin,
  getAUser,
  countUsers,
};
