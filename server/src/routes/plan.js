const express = require("express");
const router = express.Router();

// Middlewares
const {
  authCheck,
  adminCheck,
  superAdminCheck,
  superOrAdminCheck,
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
router.get("/plans", authCheck, superOrAdminCheck, getAllPlans);
router.get("/plan/:id", authCheck, superOrAdminCheck, getPlanById);
router.put("/plan/:id", authCheck, superAdminCheck, updatePlanById);
router.delete("/plan/:id", authCheck, superAdminCheck, deletePlanById);

module.exports = router;
