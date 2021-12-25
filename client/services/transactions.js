import Axios from "./apiService";

export const getTransactions = (id) =>
  Axios.get(`/transactions/${id}`)
    .then((res) => ({ success: true, data: res.data }))
    .catch((e) => ({ success: false, data: e.response }));
