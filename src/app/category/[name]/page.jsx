import RowCategoryProduct from "@/components/category/rowCategoryProduct";
import { products } from "@/data/products";


const getProduct = (name) => {


    if (name == "All") {
        return products.products.slice(1, 50);
    }
    else {
        return products.products.slice(1, 50).filter(itm => itm.category == name);
    }
}

async function CategoryProductDispayPage({ params: { name } }) {

    await new Promise(resolve =>
        setTimeout(resolve, 500)
    );

    const productByCategory = getProduct(name);


    return (
        <div className="sticky top-0 right-0 w-full lg:w-10/12 grid grid-cols-2 gap-4 lg:grid-cols-3 my-4 lg:my-10">
            {/* <!-- Product 1 Start --> */}

            {
                productByCategory?.map((product) => (
                    <RowCategoryProduct key={product.id} product={product} />
                ))
            }


        </div>
    );
}

export default CategoryProductDispayPage;