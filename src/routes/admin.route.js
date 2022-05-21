const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  createAdmin,
  loginAdmin,
  getAUser,
  countUsers,
} = require("../controllers/admin.controller");
//  creating a route
router.post("/auth/admin", createAdmin);
router.post("/auth/login", loginAdmin);
router.get("/auth/users", authenticate, authorize, getAUser);
router.get("/auth/countUsers", authenticate, authorize, countUsers);

//    exporting modules
module.exports = router;
