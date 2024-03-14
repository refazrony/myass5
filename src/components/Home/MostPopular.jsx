import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MostPopular() {

    const [polarBlog, setPopular] = useState();

    const getMostPopular = async () => {
        try {

            const response = await axios.get(`http://localhost:3000/blogs/popular`);

            setPopular(response.data);


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMostPopular()
    }, []);

    return (
        <div className="sidebar-card">
            <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                Most Popular 👍️
            </h3>

            <ul className="space-y-5 my-5">

                {polarBlog?.blogs?.map((blog) => (
                    <li key={blog.id}>
                        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                            {blog.title}
                        </h3>
                        <p className="text-slate-600 text-sm">

                            <Link to="/profile.html">{"By " + blog?.author?.firstName + " " + blog?.author?.lastName}</Link>
                            <span>·</span> {blog?.likes?.length} Likes
                        </p>
                    </li>

                ))}



            </ul>
        </div>
    );
}

export default MostPopular;