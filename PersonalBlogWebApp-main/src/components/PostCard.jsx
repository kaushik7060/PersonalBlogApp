import React from "react";
import dbService from "../appwrite/database";
import CreateImage from "./CreateImage";
import PreviewImage from "./PreviewImage";

export default function PostCard({ title, date, imageId = "" }) {
    let imgUrl = dbService.getFilePreview(imageId).href;
    return (
        <div className="my-4 flex flex-col md:flex-row-reverse px-4 py-6 w-full  rounded-3xl items-center justify-center bg-white hover:shadow-lg">
            <div className="w-[250px] h-[141px] md:w-[400px] md:h-[225px] rounded-md overflow-hidden">
                {
                    imageId ? <img
                        className="w-[250px] h-[141px] md:w-[400px] md:h-[225px] object-center object-cover"
                        src={`${imageId ? imgUrl : ""}`} alt={title} /> :
                        <PreviewImage title={title} />
                }
            </div>
            <div className="md:w-2/3">
                <p className="text-gray-500 mt-2 mb-6">{date}</p>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{title}</h1>
            </div>
        </div>
    )
}