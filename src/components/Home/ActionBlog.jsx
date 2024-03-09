
import Tdots from "../../assets/icons/3dots.svg"
import edit from "../../assets/icons/edit.svg"
import Delete from "../../assets/icons/delete.svg"
import { useState } from "react";


function ActionBlog() {

    const [showActionmenu, SetShowActionMenu] = useState(false);




    const handleClick = (event) => {
        SetShowActionMenu(!showActionmenu)
        event.stopPropagation();
    }
    return (
        <div className="absolute right-0 top-0">
            <button onClick={handleClick}>
                <img src={Tdots} alt="3dots of Action" />
            </button>
            {/* Action Menus Popup */}

            {showActionmenu &&
                <div className="action-modal-container">
                    <button className="action-menu-item hover:text-lwsGreen">
                        <img src={edit} alt="Edit" />
                        Edit
                    </button>
                    <button className="action-menu-item hover:text-red-500">
                        <img src={Delete} alt="Delete" />
                        Delete
                    </button>
                </div>
            }

        </div>
    );
}

export default ActionBlog;