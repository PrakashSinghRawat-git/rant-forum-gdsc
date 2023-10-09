import React from "react";
import { useState, useRef, useEffect } from "react";
import PostCard from "@/components/PostCard";
import PostCard2 from "@/components/PostCard2";
import { fetchAllPosts } from "@/utils/db";
import useStore from "@/store/useStore";

const Content = () => {
    const {postData, setPostData} = useStore();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllPosts();
            setPostData(data);
            console.log(postData);
        };

        fetchData();
    }, []);
    return (
        <div className="content w-full  text-red-500 text-4xl font-bold">
            <div className="posts flex justify-center items-center flex-wrap gap-5 m-5">
                {postData?.map((post) => (
                    <div key={post.id}>
                        <PostCard2 post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Content;
