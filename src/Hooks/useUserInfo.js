import { useContext } from "react";
import { AuthContext } from "../constexts";

function useUserInfo() {
  return useContext(AuthContext);
}

export default useUserInfo;
