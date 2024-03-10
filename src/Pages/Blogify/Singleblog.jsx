import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FloatingAction from "../../components/singleBlog/FloatingAction";
import Comment from "../../components/singleBlog/Comment";


function Singleblog() {

    const params = useParams()
    const [singleblog, setSingblog] = useState();


    const getSingleBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/blogs/${params.id}`);
            setSingblog(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getSingleBlog();
    }, []);


    return (
        <>
            <main>
                {/* Begin Blogs */}
                <section>
                    <div className="container text-center py-8">
                        <h1 className="font-bold text-3xl md:text-5xl">
                            {singleblog?.title}
                        </h1>
                        <div className="flex justify-center items-center my-4 gap-4">
                            <div className="flex items-center capitalize space-x-2">
                                <div className="avater-img bg-indigo-600 text-white">
                                    <span className="">S</span>
                                </div>
                                <h5 className="text-slate-500 text-sm">Saad Hasan</h5>
                            </div>
                            <span className="text-sm text-slate-700 dot">June 28, 2018</span>
                            <span className="text-sm text-slate-700 dot">100 Likes</span>
                        </div>
                        <img
                            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                            src={"http://localhost:3000/uploads/blog/" + singleblog?.thumbnail}
                            alt=""
                        />
                        {/* Tags */}
                        <ul className="tags">
                            <li>JavaScript</li>
                            <li>Node</li>
                            <li>React</li>
                            <li>Next</li>
                        </ul>
                        {/* Content */}
                        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                            {singleblog?.content}
                        </div>
                    </div>
                </section>
                {/* End Blogs */}
                {/* Begin Comments */}
                <section id="comments">
                    <div className="mx-auto w-full md:w-10/12 container">
                        <h2 className="text-3xl font-bold my-8">Comments (3)</h2>
                        <div className="flex items -center space-x-4">
                            <div className="avater-img bg-indigo-600 text-white">
                                <span className="">S</span>
                            </div>
                            <div className="w-full">
                                <textarea
                                    className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                    placeholder="Write a comment"
                                    defaultValue={""}
                                />
                                <div className="flex justify-end mt-4">
                                    <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Comment One */}

                        {singleblog?.comments?.map((c, i) => {
                            <Comment key={i} />
                        })}


                    </div>
                </section>
            </main>



            <FloatingAction />


        </>
    );
}

export default Singleblog;