import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../Hooks/useProfile";




function PrivateRoutes() {

    const { state } = useProfile();

    return (
        <>
            {state.user ? (
                <Outlet />
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}

export default PrivateRoutes;