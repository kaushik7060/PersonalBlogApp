import React, { useEffect, useRef, useState } from "react";
import { Input } from "../components"
import dbService from "../appwrite/database";
import { ID } from "appwrite";
import { useDispatch } from "react-redux";
import { setProgress } from "../store/authSlice";
import { useNavigate, useParams } from "react-router-dom";
export default function AddPost() {
    let { id } = useParams();
    id = id == "new" ? undefined : id;
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [uploadHidden, setUploadHidden] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState("");
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    const imageRef = useRef(null);
    function getSlug(s) {
        let ans = "";
        for (const i of s) {
            if (i == " ") {
                ans += "-";
            }
            else if (/^[a-zA-Z]+$/.test(i)) {
                ans += i.toLowerCase();
            }
            else if (/^[0-9]/.test(i)) {
                ans += i;
            }
        }
        return ans;
    }
    useEffect(() => {
        if (id) {
            dbService.getPost(id).then((value) => {
                setTitle(value.title);
                setSlug(value.$id);
                setContent(value.content);
                setFileId(value.imageId);
                dbService.getFile(value.imageId).then((value) => {
                    console.log("fetched succesfully", value);
                    setImgUrl(value.href);
                    setUploadHidden(true);
                })
            })
        }
    }, [])
    return (
        <div className="w-full flex flex-col items-center md:my-8">
            <div className="flex flex-col w-5/6 justify-around items-center md:flex-row flex-wrap">
                <div>
                    <input
                        placeholder="Enter title.."
                        className="my-2 w-full text-2xl p-2 rounded-md outline-none font-light shadow"
                        value={title}
                        onChange={(event) => {
                            let value = event.target.value;
                            if (value.length <= 60) {
                                setTitle(value);
                                setSlug(getSlug(value).slice(0, 37));
                            }
                        }}
                        required={true}
                        id="title"
                    />
                    <p className={`font-light text-lg ${title.length == 60 ? "text-red-700 font-normal" : ""}`}>{title.length}/60</p>
                    <Input
                        placeholder="Slug.."
                        setValue={setSlug}
                        value={slug}
                        required={true}
                        readOnly={true}
                    />
                </div>
                <div className="w-[300px] h-[169px] md:w-[400px] md:h-[225px] border-2 border-gray-800 border-dashed rounded-md flex
                items-center justify-center flex-col md:mx-4 hover:bg-white hover:cursor-pointer overflow-hidden"
                >
                    <div className={`${uploadHidden ? "hidden" : "flex flex-col items-center"}`}>
                        <p className="font-light text-xl">Choose an Image</p>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                ref={imageRef}
                                onChange={(event) => {
                                    let file = event.target.files[0];
                                    setFile(file);
                                    if (!file.type.startsWith("image/")) {
                                        alert("Kindly upload an image file");
                                        imageRef.current.value = "";
                                    }
                                    else {
                                        setImgUrl(URL.createObjectURL(file));
                                        setUploadHidden(true);
                                    }
                                }}
                                hidden
                            />
                            <button
                                className="text-xl font-semibold hover:bg-opacity-30 hover:bg-gray-800 rounded-full p-2"
                                onClick={(event) => {
                                    event.preventDefault();
                                    imageRef.current.click();
                                }}
                            >➕</button>
                        </div>
                    </div>
                    <div className={`${uploadHidden ? "grid" : "hidden"}`}>
                        <img src={imgUrl} className="w-[300px] h-[169px] md:w-[400px] md:h-[225px] object-cover object-center row-start-1 col-start-1" alt="can't display the image" />
                        <div className="deleteDiv w-[300px] h-[169px] md:w-[400px] md:h-[225px] row-start-1 col-start-1 hover:bg-black hover:bg-opacity-50 flex justify-end items-start">
                            <button
                                className="row-start-1 col-start-1 m-1 hover:bg-white rounded-full p-2"
                                onClick={() => {
                                    setImgUrl("");
                                    setUploadHidden(false);
                                    imageRef.current.value = "";
                                }}
                            ><img src="/src/pages/images/delete-icon.svg" alt="delete" width={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-5/6">
                <textarea placeholder="You can use html tags like <i>, <u>, <b> and <br> for formatting the content..." className="w-full my-2 text-2xl p-2 rounded-md outline-none font-light shadow resize-none" rows={10} value={content} onChange={(event) => setContent(event.target.value)}>
                </textarea>
                <button
                    className="bg-gray-800 text-white text-2xl px-4 py-2 rounded-lg font-light hover:bg-opacity-85 my-2"
                    onClick={async () => {
                        dispatcher(setProgress(30));
                        let imgId = fileId;
                        if (file) {
                            let value = await dbService.uploadFile(file, ID.unique());
                            dispatcher(setProgress(70));
                            if (imgId) {
                                await dbService.deleteFile(imgId);
                            }
                            imgId = value.$id;
                        }
                        if (id) {
                            await dbService.updatePost(title, id, content, "active", imgId);
                        }
                        else {
                            await dbService.createPost(title, slug, content, "active", "6658c8f80019dd21d8d0", new Date().toLocaleDateString("en-GB"), imgId);
                        }
                        navigate("/");
                    }}
                > {id ? "Save" : "Post"}</button>
            </div>
        </div >
    )
}