import { RouterProvider } from "react-router-dom";
import useAppRouters from "../Hooks/useAppRouters";

function Blogify() {
    const routers = useAppRouters();
    return (

        <RouterProvider router={routers} />
    );
}

export default Blogify;