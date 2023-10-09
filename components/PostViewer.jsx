import React from "react";
import Link from "next/link";
import Image from "next/image";
import { addLike } from "@/utils/db";
import useStore from "@/store/useStore";

const PostViewer = ({ post, setActivePost }) => {
    const {
        id,
        title,
        description,
        likes,
        comments,
        uploaderName,
        uploaderRef,
        createdOn,
    } = post;

    const { currentUserObj } = useStore();

    const handleLikeButton = () => {
        addLike(id, currentUserObj.email).then((res) => {
            if (res == true) {
                const newPostObj = { ...post, likes: res };
                setActivePost(newPostObj);
            }
        });
    };
    return (
        <div className="min-h-[300px] w-full lg:w-[57vw] flex flex-col justify-between items-start bg-black-300 rounded-lg border border-black-300 mb-6 py-2 px-4  text-white-800">
            <div className="flex-col justify-start">
                <div className=" flex justify-between rounded-full px-3 pt-1 text-gradient_purple-blue text-xs mx-2 items-center">
                    <p className=" border-b-1 border-white-800 ">
                        @ {uploaderName}
                    </p>
                    <p className="text-sm">{createdOn}</p>
                </div>
                <div className="">
                    <h4 className="text-white-800 text-2xl font-bold mb-3">
                        {title}
                    </h4>
                    <p className="text-white-800 text-xl ">{description}</p>
                </div>
            </div>
            <div className="w-full flex flex-col items-start">
                <div className="flex items-center justify-start gap-5 text-white-800 w-full">
                    {/* <div className="flex-center body-medium  text-white">
                        <Image
                            src="/comment.png"
                            width={20}
                            height={20}
                            alt="comment"
                            className=" transform hover:scale-110"
                        />
                        <span className="px-1"> {comments}</span>
                    </div> */}

                    <div className="flex-center body-medium  ">
                        <button onClick={handleLikeButton}>
                            <Image
                                src="/like1.png"
                                width={20}
                                height={20}
                                alt="like"
                                className="transform hover:scale-110 text-red-500"
                            />
                        </button>
                        <span className="px-1">{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostViewer;
