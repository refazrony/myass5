import { Outlet } from "react-router-dom";
import Navbar from "../../components/Header/Navbar"
import Search from "./Search";
import { useContext } from "react";
import { SearchContext } from "../../constexts";
import Footer from "../../components/Footer";


function Home() {
    const { searchEnable } = useContext(SearchContext);
    return (
        <>

            <Navbar />
            {searchEnable && <Search />}
            <Outlet />
            <Footer />

        </>
    );
}

export default Home;