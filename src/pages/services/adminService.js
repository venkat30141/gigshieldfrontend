import API from "./api";

/* Admin dashboard */

export const getAdminDashboard = async () => {

  const res = await API.get("/admin/dashboard");

  return res.data;

};


/* Admin plans */

export const getAdminPlans = async () => {

  const res = await API.get("/admin/plans");

  return res.data;

};