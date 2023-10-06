"use client";

import { useState, useEffect } from "react";
import PostViewer from "@/components/PostViewer";
import { usePathname, useSearchParams } from "next/navigation";
import { fetchOnePost } from "@/utils/actions";
import SideBar from "@/components/SideBar";
import Comment from "@/components/Comment";
import AddComment from "@/components/AddComment";

const page = ({ params }) => {
    const [activePost, setActivePost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchOnePost(params.postId);
            setActivePost(data);
        };

        fetchData();
    }, []);
    useEffect(() => {
        console.log("active post data is: ", activePost);
    }, [activePost]);

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
                    {activePost && <PostViewer post={activePost} />}
                </div>
                <AddComment />

                <Comment />
            </div>
        </>
    );
};
export default page;
