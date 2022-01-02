import api from "./index";

// Create a plan
export const createPlan = async (values) => {
  return await api.post("/plan", values);
};

// Get all plans
export const getAllPlans = async () => {
  return await api.get(`/plans`);
};

// Get a plan by id
export const getPlanById = async (id) => {
  return await api.get(`/plan/${id}`);
};

// Update a plan by id
export const updatePlanById = async (id, plan) => {
  return await api.put(`/plan/${id}`, plan);
};

// Delete a plan by id
export const deletePlanById = async (id) => {
  return await api.delete(`/plan/${id}`);
};
