import { Outlet } from "react-router-dom";
import Navbar from "../../components/Header/Navbar"
import Search from "./Search";
import { useContext } from "react";
import { SearchContext } from "../../constexts";
import Footer from "../../components/Footer";
import ProfileProvider from "../../constexts/Providers/ProfileProvider";

function Home() {
    const { searchEnable } = useContext(SearchContext);
    return (
        <>
            <ProfileProvider>
                <Navbar />
                {searchEnable && <Search />}
                <Outlet />
                <Footer />
            </ProfileProvider>
        </>
    );
}

export default Home;