import API from "./api";

/* Worker Login */

export const loginWorker = async (phone, aadhaar) => {

  const res = await API.post("/workers/login", {
    phone,
    aadhaar
  });

  return res.data;

};


/* Worker Register */

export const registerWorker = async (workerData) => {

  const res = await API.post("/workers/register", workerData);

  return res.data;

};


/* Get Worker Profile */

export const getWorkerProfile = async (workerId) => {

  const res = await API.get(`/workers/${workerId}`);

  return res.data;

};