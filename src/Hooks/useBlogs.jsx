import { useContext } from "react";
import { BlogContext } from "../constexts";

function useBlogs() {
    return useContext(BlogContext);
}

export default useBlogs;