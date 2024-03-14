import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FloatingAction from "../../components/singleBlog/FloatingAction";
import Comment from "../../components/singleBlog/Comment";
import { formatDate } from "../../utls/mydates";
import { useForm } from "react-hook-form";
import Field from "../../components/Others/Field";
import { useImmer } from "use-immer";
import useAxiosCall from "../../Hooks/useAxiosCall";
import { notifyError, notifySucccess } from "../../utls/myToast";
import RoundImage from "../../components/Others/RoundImage";
import { useProfile } from "../../Hooks/useProfile";


function Singleblog() {

    const params = useParams()
    const [singleblog, setSingblog] = useImmer();
    const { state: userInfo } = useProfile();




    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { api } = useAxiosCall();


    const getSingleBlog = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${params.id}`);
            setSingblog(response.data);

        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        getSingleBlog();
    }, []);

    const handleCommentSubmit = async (values) => {
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${params.id}/comment`, values);

            if (response.status === 200) {
                const newComments = response.data.comments;
                console.log("newComments", newComments);
                const lastElement = newComments[newComments.length - 1];
                console.log("last Element", lastElement);
                setSingblog(
                    draft => {
                        draft.comments.push({ ...lastElement })
                    });
                reset();
                notifySucccess("Comment added successfully");
            }
        } catch (error) {
            console.error(error);
            notifyError("Something went wrong!", error);
        }

    }

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


                                    {

                                        singleblog?.author?.avatar ? (
                                            <img
                                                className="max-w-full rounded-full"
                                                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${singleblog?.author?.avatar}`}
                                                alt={singleblog?.author?.avatar}
                                            />
                                        ) : (
                                            <span className="">{singleblog?.author?.firstName[0].toUpperCase()}</span>
                                        )
                                    }


                                </div>
                                <h5 className="text-slate-500 text-sm">{`${singleblog?.author?.firstName} ${singleblog?.author?.lastName}`}</h5>
                            </div>
                            <span className="text-sm text-slate-700 dot">{formatDate(singleblog?.createdAt)}</span>
                            <span className="text-sm text-slate-700 dot">{singleblog?.likes.length} Likes</span>
                        </div>
                        <img
                            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                            src={"http://localhost:3000/uploads/blog/" + singleblog?.thumbnail}
                            alt=""
                        />
                        {/* Tags */}
                        <ul className="tags">
                            {
                                singleblog?.tags?.split(",").map((tag, i) => (<li key={i}>{tag}</li>))
                            }

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
                        <h2 className="text-3xl font-bold my-8">Comments ({singleblog?.comments?.length})</h2>
                        <div className="flex items -center space-x-4">
                            <div className="avater-img bg-indigo-600 text-white">
                                {/* <span className="">S</span> */}
                                <RoundImage author={userInfo.user} />
                            </div>
                            <div className="w-full">
                                <form onSubmit={handleSubmit(handleCommentSubmit)}>
                                    <Field label="" error={errors.content}>
                                        <textarea
                                            {...register("content", { required: "comment is Required" })}
                                            id="content"
                                            name="content"
                                            className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                            placeholder="Write a comment"

                                        />
                                    </Field>
                                    <div className="flex justify-end mt-4">
                                        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                                            Comment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* Comment One */}


                        {
                            singleblog?.comments?.map(comment => (


                                <Comment key={comment.id} data={comment} />
                            ))
                        }







                    </div>
                </section>
            </main>



            <FloatingAction blogInfo={singleblog} blogid={params.id}
                OnLikeClick={(value, isLiked) => {
                    setSingblog(
                        draft => {
                            isLiked ? draft.likes.push({ ...value }) : draft.likes.pop()
                        });
                }}
            />


        </>
    );
}

export default Singleblog;