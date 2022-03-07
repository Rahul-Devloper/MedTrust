const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controllers
const {
  currentUser,
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
} = require("../controllers/userController");

// Routes
router.post("/currentUser", authCheck, currentUser);
router.post("/user", authCheck, adminCheck, createUser);
router.get("/user/id/:id", authCheck, getUserById);
router.get("/users", authCheck, adminCheck, getAllUsers);
router.put("/user/:id", authCheck, adminCheck, updateUserById);

module.exports = router;
