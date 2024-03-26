import { products } from "@/data/products";
import RowRoduct from "./RowRoduct";
const getProduct = () => {
    return products.products.slice(0, 12);
}
function Home() {

    const productList = getProduct();

    return (
        <section className="w-11/12 lg:w-10/12 max-w-7xl mx-auto py-10">
            <div
                className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 my-4 lg:my-10"
            >
                {
                    productList.map((product, i) => (

                        <RowRoduct key={product.id} product={product} />

                    ))
                }



            </div>


        </section>
    );
}

export default Home;