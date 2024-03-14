import like from "../../assets/icons/like.svg";
import comment from "../../assets/icons/comment.svg";
import heart from "../../assets/icons/heart.svg";
import heartfilled from "../../assets/icons/heart-filled.svg";
import useAxiosCall from "../../Hooks/useAxiosCall";
import { useEffect } from "react";
import { notifyError, notifySucccess } from "../../utls/myToast";
import { useImmer } from "use-immer";

function FloatingAction({ blogInfo, OnLikeClick, blogid }) {


    const { api } = useAxiosCall();
    const [isFev, setIsfev] = useImmer(false);

    // const foundObject = findObjectById(blogInfo?.likes, blogInfo?.id);
    //console.log(blogInfo?.likes, blogInfo?.id);
    //console.log(foundObject);


    const toggleFev = async () => {
        console.log(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogInfo.id}/favourite`);
        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogInfo.id}/favourite`);
            if (response.status === 200) {
                setIsfev(response.data.isFavourite);
                notifySucccess("Successfully Toggled Favorite");
            } else if (response.status === 404) {
                notifyError("Blog not found");
            }

        } catch (error) {
            console.log(error);

        }
    }


    const getFavourite = async () => {
        try {

            const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`);

            if (response.status === 200) {
                let result = response?.data?.blogs.filter(obj => obj.id == blogid);
                result.length > 0 ? setIsfev(true) : setIsfev(false);


            } else if (response.status === 404) {
                // notifyError("Blog not found");
            }

        } catch (error) {
            console.error(error);

        }

    }

    useEffect(() => {
        getFavourite();
    }, []);



    async function handleLickClick() {
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogInfo?.id}/like`);
            if (response.status === 200) {
                OnLikeClick(response.data.likes, response.data.isLiked)
                notifySucccess('You liked this blog');
            } else if (response.status === 404) {
                notifyError("Blog not found");
            }

        } catch (error) {
            console.log(error);
            notifyError(error);

        }
    }




    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li onClick={handleLickClick}>
                    <img src={like} alt="like" />
                    <span>{blogInfo?.likes?.length}</span>
                </li>

                <li onClick={toggleFev}>
                    <img src={isFev ? heartfilled : heart} alt="Favourite" />
                </li>
                <a href="#comments">
                    <li>
                        <img src={comment} alt="Comments" />
                        <span>{blogInfo?.comments?.length}</span>
                    </li>
                </a>
            </ul>
        </div>
    );
}

export default FloatingAction;