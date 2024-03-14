/* eslint-disable react/prop-types */

import { formatDate } from "../../utls/mydates";



function UserBlogCard({ myblog }) {


    return (
        <div className="blog-card">
            <img
                className="blog-thumb"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${myblog?.thumbnail}`}
                alt=""
            />
            <div className="mt-2">
                <h3 className="text-slate-300 text-xl lg:text-2xl">
                    {myblog?.title}
                </h3>
                <p className="mb-6 text-base text-slate-500 mt-1">
                    {myblog?.content}
                </p>
                {/* Meta Informations */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center capitalize space-x-2">
                        <div className="avater-img bg-indigo-600 text-white">
                            {/* <span className="">S</span> */}
                            <img
                                className="max-w-full rounded-full"
                                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${myblog?.author?.avatar}`}
                                alt={myblog?.author?.avatar}
                            />
                        </div>
                        <div>
                            <h5 className="text-slate-500 text-sm">{myblog?.author?.firstName + " " + myblog?.author?.lastName}</h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>{formatDate(myblog?.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm px-2 py-1 text-slate-700">
                        <span>{myblog.likes.length} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBlogCard;