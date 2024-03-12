
import Tdots from "../../assets/icons/3dots.svg"
import edit from "../../assets/icons/edit.svg"
import Delete from "../../assets/icons/delete.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosCall from "../../Hooks/useAxiosCall";
import { notifySucccess } from "../../utls/myToast";
import useBlogs from "../../Hooks/useBlogs";
import { actions } from "../../actions";


function ActionBlog({ blogId }) {

    const [showActionmenu, SetShowActionMenu] = useState(false);
    const navigate = useNavigate();
    const { api } = useAxiosCall();
    const { dispatch } = useBlogs();




    const handleClick = (event) => {
        SetShowActionMenu(!showActionmenu)
        event.stopPropagation();
    }


    function handleEditClick(event) {
        event.stopPropagation();
        navigate("editBlog/" + blogId);
    }

    async function handleDeleteClick(event) {
        event.stopPropagation();

        try {
            const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`);
            console.log(response);
            if (response.status === 200) {

                dispatch({
                    type: actions.blog.BLOG_DELETE,
                    data: blogId,
                });
                notifySucccess("One Blog Has Been Deleted .!");



            }
        } catch (error) {
            console.error(error)
        }


    }

    return (
        <div className="absolute right-0 top-0">
            <button onClick={handleClick}>
                <img src={Tdots} alt="3dots of Action" />
            </button>
            {/* Action Menus Popup */}

            {showActionmenu &&
                <div className="action-modal-container">
                    <button onClick={handleEditClick} className="action-menu-item hover:text-lwsGreen">
                        <img src={edit} alt="Edit" />
                        Edit
                    </button>
                    <button onClick={handleDeleteClick} className="action-menu-item hover:text-red-500">
                        <img src={Delete} alt="Delete" />
                        Delete
                    </button>
                </div>
            }

        </div>
    );
}

export default ActionBlog;