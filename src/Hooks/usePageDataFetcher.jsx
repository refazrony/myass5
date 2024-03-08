import { useState, useRef, useEffect } from "react";

function usePageDataFetcher(url) {

    const totalPage = useRef(0);
    const page = useRef(1);
    const [data, setData] = useState([]);
    const [isLastPage, setLastPage] = useState(false);

    const fetchData = async () => {
        try {


            console.log(isLastPage);
            if (!isLastPage) {
                // setIsLoading(true);
                // Fetch data from API http://localhost:3000/blogs?page=2
                await new Promise(r => setTimeout(r, 1000));
                const response = await fetch(url + page.current);
                const responseData = await response.json();
                // Append new data to existing data
                const { blogs } = responseData;
                totalPage.current = Math.round(responseData.total / responseData.limit);
                console.log(totalPage.current)
                console.log(`Total page ${totalPage.current} exeute page ${page.current}`)

                setData((prevData) => [...prevData, ...blogs]);

                //setPage((prevPage) => prevPage + 1);


                if (totalPage.current == page.current) {
                    setLastPage(true);
                    window.removeEventListener("scroll", handleInfiniteScroll);
                    console.log("removeEventListener " + isLastPage);
                } else {
                    page.current = page.current + 1;
                    console.log(`Total page ${totalPage.current} next page ${page.current}`)
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
            console.log("true");

        } else {
            console.log("false");
            fetchData();
        }
    };

    const handleInfiniteScroll = () => {
        throttle(handleScroll, 450);
    }
    useEffect(() => {

        window.addEventListener("scroll", handleInfiniteScroll);

        fetchData();
    }, []);


    return { data, isLastPage }
}

export default usePageDataFetcher;