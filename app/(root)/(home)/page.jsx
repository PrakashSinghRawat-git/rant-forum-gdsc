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

export default function Home() {
    const messagesRef = collection(db, "messages");

    const [allRooms, setAllRooms] = useState([]);
    const {
        showSidebar,
        setShowSidebar,
        isAuth,
        setIsAuth,
        isCreateRant,
        setIsCreateRant,
        currentUserObj,
        setCurrentUserObj,
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
                    };
                    setCurrentUserObj(userObj);

                    console.log(
                        "currentUserObj updated onAuthStateChanged: ",
                        currentUserObj
                    );
                } else {
                    // User is signed out
                    // ...
                }
            });
        };

        func();
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

                console.log("allRooms", allRooms);
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
        </div>
    );
}
