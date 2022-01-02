const Plan = require("../models/plan");

/**********************************
  Create a plan
***********************************/
exports.createPlan = async (req, res) => {
  const {
    name,
    description,
    monthlyPrice,
    annualPrice,
    trialDays,
    maxUsers,
    maxProjects,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !description ||
    !monthlyPrice ||
    !annualPrice ||
    !trialDays ||
    !maxUsers ||
    !maxProjects
  ) {
    return res.status(400).json({
      message: "Please fill in all required fields",
      status: "error",
    });
  }

  // Check if plan name already exists
  const plan = await Plan.findOne({ name }).exec();

  // If plan name already exists, return error
  if (plan) {
    return res.status(400).json({
      message: "Plan name already exists",
      status: "error",
    });
  }

  try {
    const newPlan = await new Plan(req.body).save();

    res.status(201).json(newPlan);
  } catch (error) {
    console.log("CREATE_PLAN_ERROR", error);
  }
};

/**********************************
  Get all plans
***********************************/
exports.getAllPlans = async (req, res) => {
  try {
    const allPlans = await Plan.find({}).sort({ createdAt: -1 }).exec();

    // If no plans return 404 error
    if (allPlans.length === 0) {
      return res.status(404).json({
        message: "No plans found",
        status: "error",
      });
    }

    res.status(200).json(allPlans);
  } catch (error) {
    console.log("GET_ALL_PLANS_ERROR", error);
  }
};

/**********************************
  Get a plan by id
***********************************/
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id).exec();

    // If no plan, return 404 error
    if (!plan) {
      return res.status(404).json({
        message: "No plan found",
        status: "error",
      });
    }

    res.status(200).json(plan);
  } catch (error) {
    console.log("GET_PLAN_BY_ID_ERROR", error);
  }
};

/**********************************
  Update a plan by id
***********************************/
exports.updatePlanById = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();

    // If no plan, return 404 error
    if (!updatedPlan) {
      return res.status(404).json({
        message: "No plan found",
        status: "error",
      });
    }

    res.status(200).json(updatedPlan);
  } catch (error) {
    console.log("UPDATE_PLAN_BY_ID_ERROR", error);
  }
};

/**********************************
  Delete a plan by id
***********************************/
exports.deletePlanById = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id).exec();
    res.status(200).json({ message: "Plan deleted" });
  } catch (error) {
    console.log("DELETE_PLAN_BY_ID_ERROR", error);
  }
};
