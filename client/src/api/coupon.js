import api from "./index";

export const createCoupon = async (name, code) => {
  return await api.post("/coupon", { name, code });
};

// Get all coupons
export const getCoupons = async (id, name, code) => {
  return await api.get(`/coupons/${id}`, { name, code });
};