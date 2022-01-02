const Plan = require("../models/plan");

class PlanService {
  // Create a new plan
  static CreatePlan = async (plan) => {
    try {
      const newPlan = new Plan(plan);
      await newPlan.save();

      return newPlan;
    } catch (error) {
      throw error;
    }
  };

  // Find one plan
  static FindOnePlan = async (query) => {
    try {
      const plan = await Plan.findOne(query).exec();

      return plan;
    } catch (error) {
      throw error;
    }
  };

  // Find plan by id
  static FindPlanById = async (id) => {
    try {
      const plan = await Plan.findById(id).exec();

      return plan;
    } catch (error) {
      throw error;
    }
  };

  // Find all plans
  static FindAllPlans = async () => {
    try {
      const plans = await Plan.find().exec();

      return plans;
    } catch (error) {
      throw error;
    }
  };

  // Find plan by id and update
  static FindPlanByIdAndUpdate = async (query, update) => {
    try {
      const plan = await Plan.findByIdAndUpdate(query, update, {
        new: true,
      }).exec();

      return plan;
    } catch (error) {
      throw error;
    }
  };

  // Delete plan by id
  static DeletePlanById = async (id) => {
    try {
      await Plan.findByIdAndDelete(id).exec();
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PlanService;
