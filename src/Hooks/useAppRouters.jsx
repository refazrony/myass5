import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Blogify/Home"
import CreateBlog from "../Pages/Blogify/CreateBlog"
import Profile from "../Pages/Blogify/Profile"
import Search from "../Pages/Blogify/Search"
import Indx from "../Pages/Blogify/Indx"
import Login from "../Pages/Blogify/Login";
import Register from "../Pages/Blogify/Register";
import Singleblog from "../Pages/Blogify/Singleblog";



function useAppRouters() {



    const routers = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [

                {
                    path: "/createBlog",
                    isPrivate: false,
                    element: <CreateBlog />,
                },
                {
                    path: "/singleblog/:id",
                    element: <Singleblog />,
                },
                {
                    path: "/search",
                    element: <Search />,
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/logOut",
                    element: <CreateBlog />,
                },
                {
                    path: "/profile/:id",
                    element: <Profile />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
            ]
        },
        { index: true, element: <Indx /> },

    ]);

    return routers;
}

export default useAppRouters;


// const routers = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />,
//         children: [
//             { index: true, element: <Indx /> },
//             {
//                 path: "/createBlog",
//                 isPrivate: false,
//                 element: <CreateBlog />,
//             },
//             {
//                 path: "/singleblog/:id",
//                 element: <Singleblog />,
//             },
//             {
//                 path: "/search",
//                 element: <Search />,
//             },
//             {
//                 path: "/login",
//                 element: <Login />
//             },
//             {
//                 path: "/logOut",
//                 element: <CreateBlog />,
//             },
//             {
//                 path: "/profile/:id",
//                 element: <Profile />,
//             },
//             {
//                 path: "/register",
//                 element: <Register />,
//             },
//         ]
//     },

// ]);