import { useEffect, useState } from "react";
import axios from "axios";
import UserBlogCard from "../../components/profile/UserBlogCard";
import ProfileImage from "../../components/profile/ProfileImage";
import { useParams } from "react-router-dom";
import Bio from "../../components/profile/Bio";
import Loading from "../../components/Others/Loading";





function Profile() {
    const param = useParams();
    const [profileInfo, setProfileinfo] = useState({});
    const [IsLoading, setIsLoading] = useState(true);
    const isUserSelf = param?.id == profileInfo?.id;
    console.log("isUserSelf: ", isUserSelf)


    const getProfile = async () => {

        let response;
        try {
            response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${param.id}`);
            if (response.status === 200) {
                setProfileinfo(response.data);
                console.log(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);


    if (IsLoading) {
        return <Loading />;
    }
    return (

        <main className="mx-auto max-w-[1020px] py-8">

            <div className="container">
                {/* profile info */}
                <div className="flex flex-col items-center py-8 text-center">
                    {/* profile image */}
                    <ProfileImage imagePath={profileInfo.avatar} isUserSelf={isUserSelf} />
                    {/* name , email */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                            {profileInfo?.firstName + " " + profileInfo?.lastName}

                        </h3>
                        <p className="leading-[231%] lg:text-lg">{profileInfo?.email}</p>
                    </div>

                    <Bio userBio={profileInfo.bio} isUserSelf={isUserSelf} />

                    <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
                </div>



                {/* end profile info */}
                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
                <div className="my-6 space-y-4">
                    {/* Blog Card Start */}

                    {profileInfo?.blogs?.map((blog, i) => (
                        <UserBlogCard key={i} myblog={blog} />
                    ))}

                </div>
            </div>

        </main>

    );
}

export default Profile;