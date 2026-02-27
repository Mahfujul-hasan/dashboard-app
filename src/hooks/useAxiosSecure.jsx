import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://task-api-eight-flax.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // request interceptor
    const reqInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // response interceptor
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          if (location.pathname !== "/") {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [navigate, location.pathname]);
  return instance;
};

export default useAxiosSecure;
