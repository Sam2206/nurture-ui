import axios from "axios";
import { auth } from "./firebase";

const axiosInstance = axios.create({
  baseURL: "https://mumkin-backend-e5eecngqgxg3euh9.centralindia-01.azurewebsites.net", // http://localhost:8080
  //mumkin-backend-e5eecngqgxg3euh9.centralindia-01.azurewebsites.net
  timeout: 20000, // Set a timeout (optional)
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the token is present in local storage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const setupResponseInterceptor = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 404) {
        navigate("/authentication/sign-in/basic");
      } else {
        return Promise.reject(error);
      }
    }
  );
};

auth.onIdTokenChanged((user) => {
  if (user) {
    // User is signed in and refreshToken is refreshed
    const refreshToken = user.getIdToken();
    refreshToken.then((token) => {
      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    });
  }
});

// headers: {
//         'X-Api-Key': 'YjxocGqMsPzpfwyeet1d4w==eLuCryEwweI2mao3'
//     }
export default axiosInstance;
