import { useRef, useEffect } from "react";
import BlogCard from "../../components/Home/BlogCard";
import MostPopular from "../../components/Home/MostPopular";
import Loading from "../../components/Others/Loading";
import { useProfile } from "../../Hooks/useProfile";
import useBlogs from "../../Hooks/useBlogs";
import { actions } from "../../actions";
import Favourites from "../../components/Home/Favourites";



function Home() {

    const { state } = useProfile();


    const totalPage = useRef(0);
    const page = useRef(1);

    const { state: blogsState, dispatch } = useBlogs();
    const { allBlogs: data } = blogsState
    const { isLastPage } = blogsState



    const fetchData = async () => {
        try {

            //console.log(isLastPage);


            if (!isLastPage) {

                await new Promise(r => setTimeout(r, 1000));
                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=` + page.current);
                const responseData = await response.json();

                const { blogs } = responseData;

                totalPage.current = Math.ceil(responseData.total / responseData.limit);
                //console.log("fatch data", blogs);


                dispatch({
                    type: actions.blog.DATA_FETCHED,
                    data: blogs,
                });

                if (totalPage.current == page.current) {
                    dispatch({ type: actions.blog.IS_LAST_PAGE, });
                    // setLastPage(true);
                    window.removeEventListener("scroll", handleInfiniteScroll);

                } else {
                    page.current = page.current + 1;

                }

            }


        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // setIsLoading(false);
        }
    };


    const LoadMore = async () => {
        try {



            if (!isLastPage) {

                await new Promise(r => setTimeout(r, 1000));
                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=` + page.current);
                const responseData = await response.json();
                // Append new data to existing data
                const { blogs } = responseData;
                totalPage.current = Math.ceil(responseData.total / responseData.limit);
                //console.log("fatch data", blogs);
                //setData((prevData) => [...prevData, ...blogs]);
                dispatch({
                    type: actions.blog.DATA_LOAD_MORE,
                    data: blogs,
                });
                if (totalPage.current == page.current) {
                    dispatch({ type: actions.blog.IS_LAST_PAGE, });
                    // setLastPage(true);
                    window.removeEventListener("scroll", handleInfiniteScroll);

                } else {
                    page.current = page.current + 1;

                }
            }


        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // setIsLoading(false);
        }
    };

    let throttleWait;

    const throttle = (callback, time) => {
        if (throttleWait)
            return;
        throttleWait = true;

        setTimeout(() => {
            callback();
            throttleWait = false;
        }, time);
    };


    const handleScroll = () => {
        const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

        if (!endOfPage) {
            console.log('Not at the bottom of the page');

        } else {

            LoadMore();
        }
    };

    const handleInfiniteScroll = () => {
        throttle(handleScroll, 450);
    }

    useEffect(() => {

        window.addEventListener("scroll", handleInfiniteScroll);

        if (blogsState.isFirstFetch) {
            fetchData();
        }

        return () => {
            window.removeEventListener("scroll", handleInfiniteScroll);
            console.log("EventListener cleanup");
        }
    }, []);


    return (
        <main>
            {/* Begin Blogs */}
            <section>
                <div className="container" >
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        {/* Blog Contents */}
                        <div className="space-y-3 md:col-span-5">
                            {/* Blog Card Start */}
                            {data.map((blog, i) => (
                                <BlogCard key={i} blogInfo={blog} userId={state?.user?.id} />
                            ))}
                            <Loading lastPage={isLastPage} />
                            {/* Blog Card End */}

                        </div>
                        {/* Sidebar */}
                        <div className="md:col-span-2 h-full w-full space-y-5">

                            <MostPopular />


                            {state.user ?
                                <Favourites /> : null
                            }

                        </div>
                    </div>
                </div>
            </section>
            {/* End Blogs */}
        </main>
    );
}

export default Home;