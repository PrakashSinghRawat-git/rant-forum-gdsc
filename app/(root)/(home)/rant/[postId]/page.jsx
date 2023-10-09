"use client";

import { useState, useEffect } from "react";
import PostViewer from "@/components/PostViewer";
import { usePathname, useSearchParams } from "next/navigation";
import { fetchOnePost } from "@/utils/db";
import SideBar from "@/components/SideBar";
import Comment from "@/components/Comment";
import AddComment from "@/components/AddComment";
import { fetchPostComments } from "@/utils/db";

const Page = ({ params }) => {
    const [activePost, setActivePost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const postData = await fetchOnePost(params.postId);
            console.log("post id is: ", params.postId);
            setActivePost(postData);

            const commentsData = await fetchPostComments(postData.commentsRef);
            console.log(" comment response is1: ", commentsData);
            console.log("comments array is1: ", commentsData.commentArray);

            setComments(commentsData.commentArray);
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log("active post data is: ", activePost);
        console.log("comments data is2: ", comments);
    }, [activePost, comments]);

    console.log("id is: ", params.postId);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        console.log(url);
    }, [pathname, searchParams]);

    return (
        <>
            <SideBar />
            <div className="flex-col justify-start items-center w-full  container px-0 mx-auto sm:px-5 ">
                <div className=" flex justify-center items-center post  min-w-screen mx-auto  px-6">
                    {activePost && (
                        <PostViewer
                            post={activePost}
                            setActivePost={setActivePost}
                        />
                    )}
                </div>
                <AddComment activePost={activePost} setComments={setComments} />

                <button
                    className="text-red-500 font-bold text-3xl "
                    onClick={() => {
                        console.log("comments obj is: ", comments);
                    }}
                ></button>

                {comments &&
                    comments.map((comment) => (
                        <div key={comment.byRef} className="">
                            <Comment comment={comment} />
                        </div>
                    ))}
            </div>
        </>
    );
};
export default Page;
