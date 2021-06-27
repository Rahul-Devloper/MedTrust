import api from "./index";

export const currentAdmin = async () => {
  return await api.post("/currentAdmin", {});
};
