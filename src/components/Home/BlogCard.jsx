/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import ActionBlog from "./ActionBlog";

function BlogCard({ blogInfo, userId }) {

    const nav = useNavigate();

    const handleRowClick = () => {
        nav("singleblog/" + blogInfo.id);
    }

    const handleProfileclick = () => {
        nav("profile/" + blogInfo?.author?.id);
    }

    return (

        <div onClick={handleRowClick} className="blog-card" >
            <img
                className="blog-thumb"
                src={"http://localhost:3000/uploads/blog/" + blogInfo.thumbnail}
                alt=""
            />
            <div className="mt-2 relative">
                <a href="./single-blog.html"></a>
                <h3 className="text-slate-300 text-xl lg:text-2xl">
                    <a ></a>
                    <a >{blogInfo.title}</a>
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
                                <a onClick={(e) => {
                                    e.stopPropagation()
                                    handleProfileclick(blogInfo?.id)
                                }} >{`${blogInfo.author.firstName} ${blogInfo.author.lastName}`}</a>
                            </h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>{blogInfo.createdAt}June 28, 2018</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm px-2 py-1 text-slate-700">
                        <span>{blogInfo.likes.length} Likes</span>
                    </div>
                </div>
                {/* action dot */}
                {userId == blogInfo.author.id ? (<ActionBlog blogId={blogInfo.id} />) : (null)}
                {/* action dot ends */}
            </div>
        </div>

    );
}

export default BlogCard;