import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Blogify/Home"
import CreateBlog from "../Pages/Blogify/CreateBlog"
import Profile from "../Pages/Blogify/Profile"
import Search from "../Pages/Blogify/Search"

function useAppRouters() {



    const routers = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/createBlog",
                    element: <CreateBlog />,
                },
                {
                    path: "/search",
                    element: <Search />,
                },
                {
                    path: "/logOut",
                    element: <CreateBlog />,
                },
                {
                    path: "/profile",
                    element: <Profile />,
                },
            ]
        },
        {
            path: "/login",
            element: <div>login</div>,
        },
        {
            path: "/register",
            element: <div>register</div>,
        },


    ]);

    return routers;
}

export default useAppRouters;