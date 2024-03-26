import Link from "next/link";

function RowCategoryProduct({ product }) {


    const { id, title, description,
        price, discountPercentage,
        category, thumbnail } = product




    return (<div>
        <div
            style={{ backgroundImage: `url("${thumbnail}")` }}
            className="relative delay-150 w-180px lg:w-full h-[205px] lg:h-[310px] bg-[#f8f8f8] bg-[url('/products/iphone.jpg')] bg-cover bg-center transition-all duration-3000 ease-in-out transform">
        </div>
        <h2 className="text-sm lg:text-base mt-2">
            <Link className="text-base font-bold" href={`/product/${id}`}>
                {title}
            </Link>
            <span className="text-[#919090]">
                <Link href={`/category/${category}`}>({category})</Link>
            </span>
        </h2>
        <p className="text-[#919090] text-sm ">{description}</p>

        <p className="text-rose-600 text-sm mt-4"><span className="text-[#919090] line-through">BDT {price}</span> {Math.ceil(price - ((price * discountPercentage) / 100), 2)}</p>
    </div>);
}

export default RowCategoryProduct;