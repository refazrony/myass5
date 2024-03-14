import { useEffect } from "react";
import useAxiosCall from "../../Hooks/useAxiosCall";
import { useImmer } from "use-immer";
import { Link } from "react-router-dom";

function Favourites() {

    const { api } = useAxiosCall();
    const [fev, setFev] = useImmer();

    const getFavourite = async () => {
        try {

            const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`);

            if (response.status === 200) {

                setFev(response?.data?.blogs);



            } else if (response.status === 404) {
                return (
                    <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                        No Favourites Avaliable
                    </h3>
                )
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        getFavourite();
    }, []);


    return (

        <div className="sidebar-card">
            <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                Your Favourites ❤️
            </h3>
            <ul className="space-y-5 my-5">

                {
                    fev?.map((itm) => (
                        <li key={itm?.id}>
                            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                <Link to={"singleblog/" + itm?.id}>
                                    {itm.title}
                                </Link>
                            </h3>
                            <p className="text-slate-600 text-sm">
                                {itm.tags.split(",")
                                    .map((item) => "#" + item)
                                    .join(",")
                                }
                            </p>
                        </li>
                    ))
                }


            </ul>
        </div>
    );
}

export default Favourites;