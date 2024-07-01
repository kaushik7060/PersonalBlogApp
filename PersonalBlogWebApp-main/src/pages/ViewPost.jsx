import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import dbService from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProgress, stopLoading } from "../store/authSlice";
import authService from "../appwrite/auth";
import PreviewImage from "../components/PreviewImage";
import CreateImage from "../components/CreateImage";

export default function ViewPost() {
    let { slug } = useParams();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [content, setContent] = useState("");
    const [fileId, setFileId] = useState("");
    const [isAuthor, setIsAuthor] = useState(false);
    const dispatcher = useDispatch();
    const blogs = useSelector(state => state.blog.blogs);
    const navigate = useNavigate();
    useEffect(() => {
        setImgUrl("");
        dbService.getPost(slug).then((value) => {
            setTitle(value.title);
            setDate(value.date);
            setContent(value.content);
            setFileId(value.imageId);
            window.scrollTo({ top: 0, behavior: "smooth" });
            dbService.getFile(value.imageId).then((value) => {
                setImgUrl(value.href);
            })
        })
        authService.getCurrentUser().then((value) => {
            if (authService.isAuthor()) {
                setIsAuthor(true);
            }
        })
    }, [slug]);
    return (
        title &&
        <div className="flex flex-col gap-4 items-center w-9/12 min-h-[88vh]">
            <div className="w-full flex justify-between mt-4 font-light">
                <p className="self-end font-light">{date}</p>
                {
                    isAuthor && <div>
                        <button
                            onClick={() => navigate(`/addpost/${slug}`)}
                            className="bg-gray-800 text-white text-md px-3 py-1 rounded-md font-light hover:bg-opacity-85 mx-4"
                        >Edit</button>
                        <button
                            onClick={async () => {
                                dispatcher(setProgress(30));
                                await dbService.deletePost(slug);
                                dispatcher(setProgress(60));
                                await dbService.deleteFile(fileId);
                                dispatcher(setProgress(100));
                                dispatcher(stopLoading());
                                navigate("/");
                            }}
                            className="bg-gray-800 text-white text-md px-3 py-1 rounded-md font-light hover:bg-opacity-85"
                        >Delete</button>

                    </div>
                }
            </div>
            <h1 className="text-2xl md:text-5xl font-bold my-2 text-center shadow-lg p-4 rounded-md">{title}</h1>
            <div className="w-[250px] h-[141px] md:w-[600px] md:h-[338px] rounded-md overflow-hidden mb-4">
                {
                    fileId ? <img
                        className="w-[250px] h-[141px] md:w-[600px] md:h-[338px] object-center object-cover"
                        src={imgUrl} alt={title} /> : <CreateImage title={title} />
                }
            </div>
            <div>
                <span className="font-light text-xl text-justify">{parse(content)}</span>
            </div>
            <hr className="border-2 border-gray-800 w-full" />
            <div className="w-full">
                <p className="underline text-xl">Read More Blogs & Articles</p>
                <div className="flex gap-2 justify-center flex-wrap">
                    {
                        blogs.map(i => i.$id != slug && (
                            <Link to={`/${i.$id}`} className="w-full  md:w-2/5 my-4 flex flex-col px-4 py-6 rounded-3xl items-center justify-center bg-white hover:shadow-lg" key={i.$id}>
                                <div className="w-[250px] h-[141px] rounded-md overflow-hidden">
                                    {
                                        i.imageId ? <img
                                            className="w-[250px] h-[141px] md:w-[400px] md:h-[225px] object-center object-cover"
                                            src={`${dbService.getFilePreview(i.imageId)}`} alt={i.title} /> :
                                            <PreviewImage title={i.title} />
                                    }
                                </div>
                                <div>
                                    <p className="text-gray-500 mt-2 mb-6">{i.date}</p>
                                    <h1 className="text-2xl font-bold text-gray-800">{i.title}</h1>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}