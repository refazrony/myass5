import { useEffect, useState } from "react";
import useUserInfo from "../../Hooks/useUserInfo";
import axios from "axios";
import UserBlogCard from "../../components/profile/UserBlogCard";
import edit from '../../assets/icons/edit.svg';
import ProfileImage from "../../components/profile/ProfileImage";
import { useProfile } from "../../Hooks/useProfile";
import { actions } from "../../actions";




function Profile() {
    const { user, BasedUrl } = useUserInfo();
    const [data, setData] = useState({});
    const { blogs } = data;
    const { state, dispatch } = useProfile();

    console.log(user);
    const getProfile = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        let response;
        try {
            response = await axios.get(`${BasedUrl}/profile/${user.user.id}`);
            setData(response.data);
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.DATA_FETCHED,
                    data: response.data,
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
        return <div> Fetching your Profile data...</div>;
    }
    return (

        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                {/* profile info */}
                <div className="flex flex-col items-center py-8 text-center">
                    {/* profile image */}
                    <ProfileImage />
                    {/* name , email */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                            {data?.firstName + " " + data?.lastName}
                        </h3>
                        <p className="leading-[231%] lg:text-lg">{data.email}</p>
                    </div>
                    {/* bio */}
                    <div className="mt-4 flex items-start gap-2 lg:mt-6">
                        <div className="flex-1">
                            <p className="leading-[188%] text-gray-400 lg:text-lg">
                                {data.bio}
                            </p>
                        </div>
                        {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
                        <button className="flex-center h-7 w-7 rounded-full">
                            <img src={edit} alt="Edit" />
                        </button>
                    </div>
                    <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
                </div>



                {/* end profile info */}
                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
                <div className="my-6 space-y-4">
                    {/* Blog Card Start */}




                    {blogs?.map((blog, i) => (
                        <UserBlogCard key={i} myblog={blog} />
                    ))}



                </div>
            </div>
        </main>

    );
}

export default Profile;