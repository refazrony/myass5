
import closeIcon from '../../assets/icons/close.svg';
import { useContext } from "react";
import { SearchContext } from "../../constexts";
import useDebounce from '../../Hooks/useDebounce';
import SearchRow from '../../components/Search/SearchRow';
import useAxiosCall from '../../Hooks/useAxiosCall';
import { useImmer } from 'use-immer';

function Search() {

    const { setSearchEnable } = useContext(SearchContext);
    const { api } = useAxiosCall();
    const [searchBlog, setBlog] = useImmer([]);

    console.log("resutl", searchBlog)

    const doSearch = useDebounce((value) => {
        if (value == "") {
            console.log("Empty");
            console.log(value);
            fetchAllBlogs();
        }
        else {
            console.log(value);
            funSearchByTxt(value);
        }
    }, 500);

    function handleChange(e) {
        const value = e.target.value;
        doSearch(value);
    }

    function fetchAllBlogs() {

    }


    async function funSearchByTxt(value) {
        try {

            const response = await api.get("http://localhost:3000/search?q=" + value);
            console.log(response.data.data);


            setBlog(response.data.data);


        } catch (error) {
            console.log(error);
        }
    }


    return (

        <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
            {/* <!-- Search Container --> */}
            <div
                className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10"
            >
                {/* <!-- Search --> */}
                <div>
                    <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">Search for Your Desire Blogs</h3>
                    <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Start Typing to Search"
                        className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
                    />
                </div>

                {/* <!-- Search Result --> */}
                <div className="">
                    <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
                    <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">



                        {searchBlog?.map((blog, i) => (
                            <SearchRow key={i} blog={blog} />
                        ))}


                    </div>
                </div>

                <a onClick={() => setSearchEnable(false)}>
                    <img src={closeIcon} alt="Close" className="absolute right-2 top-2 cursor-pointer w-8 h-8" />
                </a>
            </div>
        </section>
    );
}

export default Search;