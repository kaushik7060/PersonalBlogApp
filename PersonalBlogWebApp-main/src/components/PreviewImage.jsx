import React from "react";

export default function PreviewImage({title}) {
    return (
        <div className="w-[250px] h-[141px] md:w-[400px] md:h-[225px] rounded-md overflow-hidden mb-4 relative flex justify-center items-center lg:justify-end">
            <img src="/src/components/images/bg_image.jpg" className="w-[250px] h-[141px] md:w-[400px] md:h-[225px] absolute" />
            <h1 className="w-1/2 text-center text-2xl font-bold text-white underline absolute m-4">{title}</h1>
        </div>
    )
}