/* eslint-disable react/prop-types */

import Tdots from "../../assets/icons/3dots.svg"
import edit from "../../assets/icons/edit.svg"
import Delete from "../../assets/icons/delete.svg"

function BlogCard({ blogInfo }) {
    console.log(blogInfo.title);
    return (

        <div className="blog-card">
            <img
                className="blog-thumb"
                src={"http://localhost:3000/uploads/blog/" + blogInfo.thumbnail}
                alt=""
            />
            <div className="mt-2 relative">
                <a href="./single-blog.html"></a>
                <h3 className="text-slate-300 text-xl lg:text-2xl">
                    <a href="./single-blog.html"></a>
                    <a href="./single-blog.html">{blogInfo.title}</a>
                </h3>
                <p className="mb-6 text-base text-slate-500 mt-1">
                    {blogInfo.content}
                </p>
                {/* Meta Informations */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center capitalize space-x-2">
                        <div className="avater-img bg-indigo-600 text-white">
                            <span className="">S</span>
                        </div>
                        <div>
                            <h5 className="text-slate-500 text-sm">
                                <a href="./profile.html">Saad Hasan</a>
                            </h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>June 28, 2018</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm px-2 py-1 text-slate-700">
                        <span>100 Likes</span>
                    </div>
                </div>
                {/* action dot */}
                <div className="absolute right-0 top-0">
                    <button>
                        <img src={Tdots} alt="3dots of Action" />
                    </button>
                    {/* Action Menus Popup */}
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
                </div>
                {/* action dot ends */}
            </div>
        </div>

    );
}

export default BlogCard;