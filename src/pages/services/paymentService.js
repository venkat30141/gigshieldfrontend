import API from "./api";

/* Pay weekly premium */

export const payPremium = async (workerId) => {

  const res = await API.post(`/payment/pay/${workerId}`);

  return res.data;

};


/* Get payment history */

export const getPayments = async (workerId) => {

  const res = await API.get(`/payment/${workerId}`);

  return res.data;

};