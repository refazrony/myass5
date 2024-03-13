import { useForm } from "react-hook-form";
import Field from "../../components/Others/Field";
import useAxiosCall from "../../Hooks/useAxiosCall";
import { useProfile } from "../../Hooks/useProfile";
import { actions } from "../../actions";
import Loading from "../../components/Others/Loading";
import { notifySucccess } from "../../utls/myToast";
import { useNavigate } from "react-router-dom";
import useBlogs from "../../Hooks/useBlogs";




function CreateBlog() {
    const { state, dispatch } = useProfile();
    const { dispatch: BlogDispatch } = useBlogs();
    const { api } = useAxiosCall();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();




    const handleCreateBlog = async (values) => {


        const formData = new FormData();
        // append image
        for (const file of values.thumbnail) {
            formData.append("thumbnail", file);
        }
        // append content
        formData.append("title", values.title);
        formData.append("tags", values.tags);
        formData.append("content", values.content);



        try {


            dispatch({ type: actions.profile.DATA_FETCHING });
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs`, formData);

            if (response.status === 201) {

                dispatch({
                    type: actions.profile.DATA_FETCHED_BLOG,
                    data: response.data.blog
                });

                BlogDispatch({
                    type: actions.blog.DATA_LOAD_MORE,
                    data: [response.data.blog],
                });


                console.log([response.data.blog]);


                notifySucccess("Blog created successfully!");
                navigate("/");

            }
        } catch (error) {
            console.error(error);

        }
    };


    if (state?.loading) {
        return <div className="container"><Loading /></div>;
    }


    return (
        <main>
            <section>
                <div className="container">
                    {/* Form Input field for creating Blog Post */}

                    <form onSubmit={handleSubmit(handleCreateBlog)} className="createBlog">
                        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                            <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                                <label

                                    className="cursor-pointer"
                                    htmlFor="thumbnail"
                                >Upload Your Image</label>

                                <input
                                    {...register("thumbnail")}
                                    type="file"
                                    name="thumbnail"
                                    id="thumbnail"
                                    className="hidden"

                                />

                            </div>
                        </div>
                        <div className="mb-6">
                            <Field label="" error={errors.title}>
                                <input
                                    {...register("title", { required: "Adding some text is mandatory!", })}
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter your blog title"
                                />
                            </Field>
                        </div>
                        <div className="mb-6">

                            <Field label="" error={errors.tags}>
                                <input
                                    {...register("tags", { required: "Adding some text is mandatory!", })}
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                                />
                            </Field>
                        </div>
                        <div className="mb-6">
                            <Field label="" error={errors.content}>
                                <textarea
                                    {...register("content", { required: "Adding some text is mandatory!", })}
                                    id="content"
                                    name="content"
                                    placeholder="Write your blog content"
                                    rows={8}
                                    defaultValue={""}
                                />
                            </Field>
                        </div>
                        <button
                            href="./createBlog.html"
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            type="submit"
                        >
                            Create Blog
                        </button>
                    </form>
                </div>
            </section >
        </main >

    );
}

export default CreateBlog;