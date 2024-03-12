import logo from '../../assets/logo.svg'
import search from '../../assets/icons/search.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../constexts';
import { useProfile } from '../../Hooks/useProfile';
import { actions } from '../../actions';


function Navbar() {

    const nav = useNavigate();
    // const { user, setUser } = useContext(AuthContext);
    const { setSearchEnable } = useContext(SearchContext);

    const { state, dispatch } = useProfile();
    const { user } = state;

    const handleLogout = () => {
        dispatch({
            type: actions.profile.RESET,
            data: null,
        });
        nav("/", { replace: true, });
        window.location.reload();
    }


    return (

        <header>
            <nav className="container">
                {/* Logo */}
                <div>
                    <Link to="/" >
                        <img className="w-32" src={logo} alt="lws" />
                    </Link>
                </div>
                {/* Actions - Login, Write, Home, Search */}
                {/* Notes for Developers */}
                {/* For Logged in User - Write, Profile, Logout Menu */}
                {/* For Not Logged in User - Login Menu */}
                <div>
                    <ul className="flex items-center space-x-5">
                        <li>

                            <Link
                                to="/"
                                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Home
                            </Link>

                        </li>
                        <li>

                            {user ? (<Link
                                to="createBlog"
                                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Write
                            </Link>) : (null)}

                        </li>
                        <li>

                            <a onClick={() => setSearchEnable(true)} className="flex items-center gap-2 cursor-pointer">
                                <img src={search}
                                    alt="Search" />
                                <span>Search</span>
                            </a>
                        </li>
                        <li>


                            {user ? (
                                <>
                                    <a href='#'
                                        onClick={handleLogout}
                                        className="text-white/50 hover:text-white transition-all duration-200"
                                    >
                                        Logout
                                    </a>

                                </>
                            ) : (<Link to="login">Login</Link>)}


                        </li>
                        <li className="flex items-center">
                            {/* Circular Div with background color */}

                            {user ? (<>
                                <div className="avater-img bg-orange-600 text-white">
                                    {/* <span >S</span> */}
                                    <img
                                        className="max-w-full rounded-full"
                                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${state?.user?.avatar}`}
                                        alt={state?.user?.avatar}
                                    />

                                </div>
                                <Link to={"profile/" + state?.user?.id} >
                                    <span className="text-white ml-2">{state?.user?.firstName + " " + state?.user?.lastName}</span>
                                </Link></>) : (null)

                            }


                            {/* Profile Image */}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

    );
}

export default Navbar;