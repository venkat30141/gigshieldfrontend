import API from "./api";

/* Get all insurance plans */

export const getPlans = async () => {

  const res = await API.get("/admin/plans");

  return res.data;

};


/* Buy insurance policy */

export const buyPolicy = async (workerId, planId) => {

  const res = await API.post(`/policy/buy/${workerId}/${planId}`);

  return res.data;

};


/* Get worker policies */

export const getPolicies = async (workerId) => {

  const res = await API.get(`/policy/${workerId}`);

  return res.data;

};