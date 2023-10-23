"use client";
import Auth from "@/components/Auth";
import { useState, useRef, useEffect } from "react";
import Chat from "@/components/Chat";
// import { auth, db } from "@/app/config/firebase";
import { auth, db } from "@/app/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Content from "@/components/Content";
import SideBar from "@/components/SideBar";
import useStore from "@/store/useStore";
import PostCard2 from "@/components/PostCard2";
import CreateRantForm from "@/components/CreateRantForm";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getVisitorCount, updateVisitorCount } from "@/utils/db";

export default function Home() {
    const messagesRef = collection(db, "messages");

    const [allRooms, setAllRooms] = useState([]);
    const {
        showSidebar,
        setIsAuth,
        isCreateRant,
        currentUserObj,
        setCurrentUserObj,
        visitorCount,
        setVisitorCount,
    } = useStore();

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
                            // console.log("user is: ", response.data());
                            userObj.anonymousName =
                                response.data().anonymousName;
                            setCurrentUserObj(userObj);

                            // console.log(
                            //     "currentUserObj updated onAuthStateChanged: ",
                            //     currentUserObj
                            // );
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
        const updateVisitorsCountFunc = async () => {
            const response = await updateVisitorCount();
            console.log("visitor Count updated: ", response);
        };
        updateVisitorsCountFunc();
        const getVisitorsFunc = async () => {
            // const count = await getVisitorCount();
            // setVisitorCount(count)
            const response = await getVisitorCount();
            setVisitorCount(response);
            console.log("response is of visitor: ", response);
        };
        getVisitorsFunc();
    }, []);

    useEffect(() => {
        const countUniqueUsers = async () => {
            try {
                const users = await getDocs(messagesRef);
                const uniqueRooms = new Set();

                users.forEach((doc) => {
                    const room = doc.data().room;
                    uniqueRooms.add(room);
                });

                setAllRooms(Array.from(uniqueRooms)); // Convert Set to an array

                // console.log("allRooms", allRooms);
            } catch (error) {
                console.error("Error counting unique users:", error);
            }
        };

        countUniqueUsers();
    }, []);

    const [room, setRoom] = useState("");

    // console.log(isAuth);

    const roomRef = useRef();

    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
        setRoom(null);
    };

    // if (!isAuth) {
    //     return (
    //         <div>
    //             <Auth />
    //         </div>
    //     );
    // }
    return (
        <div className="flex relative">
            <SideBar />

            <div
                className={`${
                    showSidebar ? "w-[100vw]" : ""
                } flex justify-center items-center w-full`}
            >
                <Content />
            </div>

            {isCreateRant && <CreateRantForm />}

            {visitorCount && (
                <div className="text-white-800 absolute right-2 text-sm border-b-2 mb-2 border-white">
                    <span className="text-red-500 font-bold">
                        {visitorCount}
                    </span>
                    &nbsp;people visited this site
                </div>
            )}
        </div>
    );
}
