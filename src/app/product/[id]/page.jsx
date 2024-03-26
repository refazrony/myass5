import ProductImageBox from "@/components/ProductImageBox";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";



const getProduct = () => {
    return products.products.slice(0, 50);
}

function SingleProductPage({ params }) {



    const productList = getProduct();

    const Objproduct = productList.find(item => item.id == params.id);

    return (
        <>
            <section className="bg-[#fafaf2] h-full py-20">
                <div className="w-11/12 lg:w-8/12 max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row items-center justify-between">


                    <ProductImageBox objProduct={Objproduct} />

                    <div className="w-full lg:w-5/12">
                        <h1 className="italic text-xl lg:text-3xl font-serif font-semibold">{Objproduct.title}</h1>
                        <span className="text-[#919090] my-3">   <Link href={`/category/${Objproduct.category}`}>{Objproduct.category}</Link>  </span>
                        <div className="mt-3 flex items-center justify-start gap-1">
                            <Image src="/svg/star.svg" width={20} height={20} alt="" />
                            <Image src="/svg/star.svg" width={20} height={20} alt="" />
                            <Image src="/svg/star.svg" width={20} height={20} alt="" />
                            <Image src="/svg/star.svg" width={20} height={20} alt="" />
                            <Image src="/svg/star.svg" width={20} height={20} alt="" />
                        </div>
                        <hr className="my-5 bg-black" />

                        <div>
                            <p className="my-3">
                                <span className="text-rose-600 opacity-60 line-through">BDT {Objproduct.price}</span>
                                <span className="font-bold text-2xl">{Math.ceil(Objproduct.price - ((Objproduct.price * Objproduct.discountPercentage) / 100), 2)}</span>
                            </p>
                        </div>
                        <div>
                            <p className="leading-7">
                                {Objproduct.description}
                            </p>

                            <button className="w-full bg-[#1a1a1a] hover:bg-[#3a3a3a] text-center py-3 mt-5 text-white rounded-full">
                                Add To Cart - BDT {Math.ceil(Objproduct.price - ((Objproduct.price * Objproduct.discountPercentage) / 100), 2)}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>


    );
}

export default SingleProductPage;