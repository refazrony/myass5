import axios from "axios";
import { api } from "../api";
import { useEffect } from "react";
import { useProfile } from "./useProfile";
import { actions } from "../actions";

function useAxiosCall() {
  const { state, dispatch } = useProfile();
  console.log(state);

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = state?.token?.accessToken;
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
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = state?.token?.refreshToken;
            console.log(`refreshToken Token: ${refreshToken}`);
            const response = await axios.post(
              `http://localhost:3000/auth/refresh-token`,
              { refreshToken }
            );
            const { accessToken } = response.data;

            console.log(`New Token: ${accessToken}`);

            // setUser({
            //   ...user,
            //   token: {
            //     ...user.token,
            //     accessToken: token,
            //   },
            // });

            dispatch({
              type: actions.profile.USER_TOKEN_UPDATE,
              data: response.data,
            });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (error) {
            console.error(error);
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
  }, [state?.token?.accessToken]);

  return { api };
}

export default useAxiosCall;
