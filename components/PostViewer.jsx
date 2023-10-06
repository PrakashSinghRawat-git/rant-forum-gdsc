import React from "react";
import Link from "next/link";
import Image from "next/image";
const PostViewer = ({ post }) => {
    const {
        id,
        title,
        description,
        likes,
        comments,
        uploaderName,
        uploaderRef,
    } = post;
    return (
        <div className="min-h-[300px] w-full lg:w-[57vw] flex flex-col justify-between items-start bg-black-300 rounded-lg border border-black-300 mb-6 py-2 px-4  text-white-800">
            <div className="flex-col justify-start">
                <div className=" flex justify-between rounded-full px-3 pt-1 text-gradient_purple-blue text-xs mx-2 items-center">
                    <p className=" border-b-1 border-white-800 ">
                        @ {uploaderName}
                    </p>
                    <p className="text-sm">March 28, 2020</p>
                </div>
                <div className="">
                    <h4 className="text-white-800 text-2xl font-bold mb-3">
                        {title}
                    </h4>
                    <p className="text-white-800 text-xl ">
                        {description}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla non velit a erat fringilla malesuada. Suspendisse
                        eu vestibulum libero. Fusce id bibendum turpis.
                        Curabitur vehicula, elit ut dapibus feugiat, erat lorem
                        tristique
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col items-start">
                <div className="flex items-center justify-start gap-5 text-white-800 w-full">
                    <div className="flex-center body-medium  text-white ">
                        <Image
                            src="/downloads.svg"
                            width={20}
                            height={20}
                            alt="download"
                        />
                        {likes} likes
                    </div>
                    <div className="flex-center body-medium  text-white">
                        <Image
                            src="/downloads.svg"
                            width={20}
                            height={20}
                            alt="download"
                        />
                        {comments} gags
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-pencil"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                        </svg>
                    </div>

                   
                </div>
            </div>
        </div>
    );
};

export default PostViewer;
