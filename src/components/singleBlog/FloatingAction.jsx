import like from "../../assets/icons/like.svg";
import comment from "../../assets/icons/comment.svg";
import heart from "../../assets/icons/heart.svg";

function FloatingAction() {
    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li>
                    <img src={like} alt="like" />
                    <span>10</span>
                </li>

                <li>

                    <img src={heart} alt="Favourite" />
                </li>
                <a href="#comments">
                    <li>
                        <img src={comment} alt="Comments" />
                        <span>3</span>
                    </li>
                </a>
            </ul>
        </div>
    );
}

export default FloatingAction;