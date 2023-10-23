import React from "react";
import Link from "next/link";
import Image from "next/image";
const PostCard2 = ({ post }) => {
    const { id, title, description, likes, commentArray, uploaderName, createdOn } =
        post;
        console.log('comment array is:'+commentArray)
    return (
        <div className="h-60 w-[350px] md:w-[400px] flex flex-col justify-between items-start bg-black-300 rounded-lg border border-blue-300 mb-6 py-2 px-4 text-white-800">
            <div>
                <h4 className="text-white-800 text-2xl font-bold mb-3">
                    {title}
                </h4>
                <p className="text-white-800 text-xl  line-clamp-4">
                    {description}
                </p>
            </div>
            <div className="w-full flex flex-col items-start">
                <div className="mb-3 border border-white-800 rounded-full px-3 py-1 text-gradient_purple-blue text-xs flex items-center">
                    <p className="ml-2 ">@ {uploaderName}</p>
                </div>
                <div className="flex items-center justify-between text-white-800 w-full">
                    <p className="text-sm">{createdOn}</p>
                    <div className="flex-center body-medium  text-white ">
                        <Image
                            src="/like1.png"
                            width={20}
                            height={20}
                            alt="like"
                        />
                        <span className="px-1">{likes}</span>
                    </div>
                    <div className="flex-center body-medium  text-white">
                        <Image
                            src="/comment.png"
                            width={20}
                            height={20}
                            alt="comment"
                        />
                        <span className="px-1"> {commentArray?.length}</span>
                    </div>

                    <Link
                        href={`/rant/${id}`}
                        className="flex-center text-gradient_purple-blue body-semibold gap-1.5"
                    >
                        view
                        <Image
                            src="/arrow-blue.svg"
                            width={13}
                            height={10}
                            alt="arrow"
                        ></Image>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard2;
