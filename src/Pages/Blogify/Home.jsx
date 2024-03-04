import { Outlet } from "react-router-dom";
import Navbar from "../../components/Header/Navbar"

function Home() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Home;