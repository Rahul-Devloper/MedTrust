const express = require("express");
const router = express.Router();

// Middlewares
const {
  authCheck,
  adminCheck,
  superAdminCheck,
} = require("../middlewares/auth");

// Controllers
const {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlanById,
  deletePlanById,
} = require("../controllers/plan");

// Routes
router.post("/plan", authCheck, superAdminCheck, createPlan);
router.get("/plans", authCheck, adminCheck, getAllPlans);
router.get("/plan/:id", authCheck, adminCheck, getPlanById);
router.put("/plan/:id", authCheck, superAdminCheck, updatePlanById);
router.delete("/plan/:id", authCheck, superAdminCheck, deletePlanById);

module.exports = router;
