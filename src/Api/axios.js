import axios from "axios";

const axiosInstance = axios.create({
  //local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/api-clone-1f628/us-central1/api",


//deploy of at render link server
 baseURL: "https://backend-amazon-api.onrender.com/",
});

export { axiosInstance };
