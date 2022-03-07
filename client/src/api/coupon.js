import api from "./index";

// Create a coupon
export const createCoupon = async (values) => {
  return await api.post("/coupon", values);
};

// Get all coupons
export const getAllCoupons = async () => {
  return await api.get(`/coupons`);
};

// Get a coupon by id
export const getCouponById = async (id) => {
  return await api.get(`/coupon/${id}`);
};

// Update a coupon by id
export const updateCouponById = async (id, values) => {
  return await api.put(`/coupon/${id}`, values);
};

// Delete a coupon by id
export const deleteCouponById = async (id) => {
  return await api.delete(`/coupon/${id}`);
};

// Validate a coupon
export const validateCoupon = async (code) => {
  return await api.post(`/coupon/validate`, code);
};
