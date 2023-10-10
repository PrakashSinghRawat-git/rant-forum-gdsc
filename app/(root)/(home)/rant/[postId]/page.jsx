"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import PostViewer from "@/components/PostViewer";
import SideBar from "@/components/SideBar";
import Comment from "@/components/Comment";
import AddComment from "@/components/AddComment";
import CreateRantForm from "@/components/CreateRantForm";

import { fetchPostComments,fetchOnePost, getUser } from "@/utils/db";
import useStore from "@/store/useStore";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Page = ({ params }) => {
    const [activePost, setActivePost] = useState(null);
    const [comments, setComments] = useState([]);
    const { isCreateRant, currentUserObj, setCurrentUserObj } = useStore();

    const auth = getAuth();

    useEffect(() => {
        const func = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userObj = {
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                        anonymousName: user.anonymousName,
                    };
                    getUser(user.email).then((response) => {
                        if (response) {
                            console.log("user is: ", response.data());
                            userObj.anonymousName = response.data().anonymousName;
                            setCurrentUserObj(userObj);

                            console.log(
                                "currentUserObj updated onAuthStateChanged: ",
                                currentUserObj
                            );
                        }
                    });
                } else {
                    // User is signed out
                    // ...
                }
            });
        };

        func();
    }, []);

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
            {isCreateRant && <CreateRantForm />}
        </>
    );
};
export default Page;
