import React from "react";

export default function Button({
    title,
    type = "",
    className="",
    ...props
}) {
    return (
        <button type = {type} className={`bg-gray-800 text-white text-2xl px-4 py-2 rounded-lg font-light hover:bg-opacity-85 my-2 ${className}`}>{title}</button>
    )
}