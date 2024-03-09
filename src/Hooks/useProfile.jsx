import { useContext } from "react";
import { ProfileContext } from "../constexts";


export const useProfile = () => {
    return useContext(ProfileContext);
};
