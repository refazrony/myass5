import axios from "axios";
import useUserInfo from "./useUserInfo";
import { api } from "../api";
import { useEffect } from "react";

function useAxiosCall() {
  const { user, setUser } = useUserInfo();
  console.log(user);

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = user.token.accessToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = user.token.refreshToken;
            const response = await axios.post(
              `http://localhost:3000/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;

            console.log(`New Token: ${token}`);

            setUser({
              ...user,
              token: {
                ...user.token,
                accessToken: token,
              },
            });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            console.log(error);
            //throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [user.token.accessToken]);

  return { api };
}

export default useAxiosCall;
