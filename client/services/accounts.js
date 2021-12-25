import axios from "./apiService";
export const getAccountData = () =>
  axios
    .get("/accounts")
    .then((res) => ({ success: true, data: res.data }))
    .catch((e) => ({ success: false, data: e.response }));
