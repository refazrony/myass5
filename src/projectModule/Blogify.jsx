import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../routes/PrivateRoutes";
import Home from "../Pages/Blogify/Home";
import Profile from "../Pages/Blogify/Profile";
import Login from "../Pages/Blogify/Login";
import Register from "../Pages/Blogify/Register";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer";
import CreateBlog from "../Pages/Blogify/CreateBlog";
import Singleblog from "../Pages/Blogify/Singleblog";
import { useContext } from "react";
import Search from "../Pages/Blogify/Search";
import { SearchContext } from "../constexts";
import EditBlog from "../Pages/Blogify/EditBlog";




function Blogify() {

    const { searchEnable } = useContext(SearchContext);

    return (
        <>
            <Navbar />
            {searchEnable && <Search />}
            <Routes>
                <Route element={<Home />} path="/" exact />
                <Route element={<PrivateRoutes />}>
                    {/* <Route element={<Home />} path="/" exact /> */}
                    <Route element={<Profile />} path="/profile/:id" />
                    <Route element={<CreateBlog />} path="/createBlog" />
                    <Route element={<EditBlog />} path="/editBlog/:id" />
                    <Route element={<Singleblog />} path="/singleblog/:id" />
                </Route>

                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
                {/* <Route element={<NotFoundPage />} path="*" /> */}
            </Routes>
            {/* <RouterProvider router={routers} /> */}
            <Footer />
        </>
    );
}

export default Blogify;