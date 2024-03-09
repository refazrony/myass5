/* eslint-disable react/prop-types */

import UnderratedVideo from "../../assets/blogs/Underrated Video.jpg"

function UserBlogCard({ myblog }) {


    return (
        <div className="blog-card">
            <img
                className="blog-thumb"
                src={UnderratedVideo}
                alt=""
            />
            <div className="mt-2">
                <h3 className="text-slate-300 text-xl lg:text-2xl">
                    {myblog.title}
                </h3>
                <p className="mb-6 text-base text-slate-500 mt-1">
                    {myblog.content}
                </p>
                {/* Meta Informations */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center capitalize space-x-2">
                        <div className="avater-img bg-indigo-600 text-white">
                            <span className="">S</span>
                        </div>
                        <div>
                            <h5 className="text-slate-500 text-sm">Saad Hasan</h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>June 28, 2018</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm px-2 py-1 text-slate-700">
                        <span>100 Likes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBlogCard;