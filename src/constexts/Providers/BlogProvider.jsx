import { useReducer } from "react";
import { BlogContext } from "..";
import { blogReducer, initialBlog } from "../../reducers/blogReducer";


function BlogProvider({ children }) {
    const [state, dispatch] = useReducer(blogReducer, initialBlog);
    return (
        <BlogContext.Provider value={{ state, dispatch }}>
            {children}
        </BlogContext.Provider>
    );
}

export default BlogProvider;