const Plan = require("../models/plan");

class PlanService {
  // Create a new plan
  static createPlan = async (plan) => {
    try {
      const newPlan = new Plan(plan);
      await newPlan.save();

      return newPlan;
    } catch (error) {
      throw error;
    }
  };

  // Find one plan
  static findOnePlan = async (query) => {
    try {
      const plan = await Plan.findOne(query).exec();

      return plan;
    } catch (error) {
      throw error;
    }
  };

  // Find plan by id
  static findPlanById = async (id) => {
    try {
      const plan = await Plan.findById(id).exec();

      return plan;
    } catch (error) {
      throw error;
    }
  };

  // Find all plans
  static findAllPlans = async () => {
    try {
      const plans = await Plan.find().exec();

      return plans;
    } catch (error) {
      throw error;
    }
  };

  // Find plan by id and update
  static findPlanByIdAndUpdate = async (id, update) => {
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
  static deletePlanById = async (id) => {
    try {
      const plan = await Plan.findByIdAndDelete(id).exec();

      return plan;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PlanService;
