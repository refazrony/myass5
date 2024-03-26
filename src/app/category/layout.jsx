import AppLink from "@/components/AppLink";

function categoryLayout({ children }) {
    return (


        <section className="w-11/12 lg:w-10/12 max-w-7xl mx-auto py-0 lg:py-10 lg:flex justify-between items-start">

            <div className="w-full flex items-center justify-between lg:block lg:w-2/12 my-10 lg:my-0 lg:mt-4">

                <button className="hover:border-b border-black block h-6 box-border mt-4">
                    <AppLink path={`/category/All`}>All</AppLink>
                </button>

                <button className="hover:border-b border-black block h-6 box-border mt-5">
                    <AppLink path="/category/smartphones">Smartphones</AppLink>
                </button>

                <button className="hover:border-b border-black block h-6 box-border mt-5">
                    <AppLink path="/category/laptops">Laptops</AppLink>
                </button>

                <button className="hover:border-b border-black block h-6 box-border mt-5">
                    <AppLink path="/category/fragrances">Fragrances</AppLink>
                </button>

                <button className="hover:border-b border-black block h-6 box-border mt-5">
                    <AppLink path="/category/skincare">Skincare</AppLink>
                </button>

                <button className="hover:border-b border-black block h-6 box-border mt-5">
                    <AppLink path="/category/groceries">Groceries</AppLink>
                </button>
            </div>
            {children}
        </section>


    );
}

export default categoryLayout;