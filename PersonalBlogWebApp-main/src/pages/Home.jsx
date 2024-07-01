import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";


export default function Home() {
    console.log("in the home component..");
    const blogs = useSelector(state => state.blog.blogs);
    return blogs ? <div className="w-full min-h-[88vh]">
        {
            blogs.map(i => (
                <Link to = {`/${i.$id}`} className="flex justify-center m-auto w-8/12 overflow-clip" key={i.$id}><PostCard title={i.title} date={i.date} imageId={i.imageId} /></Link>
            ))
        }
    </div> : null;
}