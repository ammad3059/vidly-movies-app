import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

axios.interceptors.response.use(null, (error) => {
  console.log("Interceptor Called", error.response);
  const expectedError =
    error.response && error.response >= 400 && error.response <= 500;
  if (!expectedError) {
    console.log("Unexpected error occured");
    toast.error("An unexpected error occured!");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
