import { useEffect } from "react";
import axios from "axios";
import UserBlogCard from "../../components/profile/UserBlogCard";
import ProfileImage from "../../components/profile/ProfileImage";
import { useProfile } from "../../Hooks/useProfile";
import { actions } from "../../actions";
import { useParams } from "react-router-dom";
import Bio from "../../components/profile/Bio";
import Loading from "../../components/Others/Loading";





function Profile() {
    const param = useParams();
    const { state, dispatch } = useProfile();


    const getProfile = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        let response;
        try {
            response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${param.id}`);
            if (response.status === 200) {
                const { blogs } = response.data;
                console.log(response);

                dispatch({
                    type: actions.profile.DATA_FETCHED,
                    data: blogs,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);


    if (state?.loading) {
        return <Loading />;
    }
    return (

        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                {/* profile info */}
                <div className="flex flex-col items-center py-8 text-center">
                    {/* profile image */}
                    <ProfileImage imagePath={state?.user?.avatar} />
                    {/* name , email */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                            {state?.user?.firstName + " " + state.user?.lastName}
                        </h3>
                        <p className="leading-[231%] lg:text-lg">{state.user?.email}</p>
                    </div>

                    <Bio />

                    <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
                </div>



                {/* end profile info */}
                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
                <div className="my-6 space-y-4">
                    {/* Blog Card Start */}

                    {state?.blogs?.map((blog, i) => (
                        <UserBlogCard key={i} myblog={blog} />
                    ))}

                </div>
            </div>
        </main>

    );
}

export default Profile;