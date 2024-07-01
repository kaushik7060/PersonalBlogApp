import React from "react";

export default function CreateImage({ title }) {
    return (
        <div className="w-[250px] h-[141px] md:w-[600px] md:h-[338px] rounded-md overflow-hidden mb-4 relative flex justify-end items-center">
            <img src="/src/components/images/bg_image.jpg" className="w-[250px] h-[141px] md:w-[600px] md:h-[338px] object-center object-cover absolute" />
            <h1 className="w-1/2 text-center text-3xl md:text-6xl font-bold text-white underline absolute m-4">{title}</h1>
        </div>
    )
}