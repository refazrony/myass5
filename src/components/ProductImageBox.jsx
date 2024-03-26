"use client"

import { useState } from "react";

function ProductImageBox({ objProduct }) {

    const { thumbnail } = objProduct;
    const [showImage, setShowImage] = useState(thumbnail);


    const handleClick = (path) => {

        setShowImage(path)
    }

    return (
        <div className="w-full lg:w-7/12 border border-slate-500/20 p-4">
            <img src={`${showImage}`} className="w-[400px] h-[500px] mx-auto object-cover" alt="" />

            <div className="flex gap-4 mt-4">
                {objProduct.images.map((path) => (
                    <img
                        key={path}
                        src={`${path}`}
                        onClick={() => handleClick(path)}
                        className={path == showImage ? "w-[100px] h-[100px] mx-auto border object-cover cursor-pointer ring-4" :
                            "w-[100px] h-[100px] mx-auto border object-cover cursor-pointer"}
                        alt="" />
                ))}
            </div>
        </div>
    );
}

export default ProductImageBox;