import API from "./api";

/* Get all claims */

export const getClaims = async () => {

  const res = await API.get("/claims");

  return res.data;

};