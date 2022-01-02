const Plan = require("../models/plan");

// Create a new plan
exports.CreatePlan = async (plan) => {
  try {
    const newPlan = new Plan(plan);
    await newPlan.save();

    return newPlan;
  } catch (error) {
    throw error;
  }
};

// Find one plan
exports.FindOnePlan = async (query) => {
  try {
    const plan = await Plan.findOne(query).exec();

    return plan;
  } catch (error) {
    throw error;
  }
};

// Find all plans
exports.FindAllPlans = async () => {
  try {
    const plans = await Plan.find({}).sort({ createdAt: -1 }).exec();

    return plans;
  } catch (error) {
    throw error;
  }
};

// Find plan by id
exports.FindPlanById = async (id) => {
  try {
    const plan = await Plan.findById(id).exec();

    return plan;
  } catch (error) {
    throw error;
  }
};

// Find plan by id and update
exports.FindPlanByIdAndUpdate = async (id, update) => {
  try {
    const plan = await Plan.findByIdAndUpdate(id, update, {
      new: true,
    }).exec();

    return plan;
  } catch (error) {
    throw error;
  }
};

// Delete plan by id
exports.DeletePlanById = async (id) => {
  try {
    const plan = await Plan.findByIdAndDelete(id).exec();

    return plan;
  } catch (error) {
    throw error;
  }
};
