"use client";
import Auth from "@/components/Auth";
import Cookies from "universal-cookie";
import { useState, useRef, useEffect } from "react";
import Chat from "@/components/Chat";
import { signOut } from "firebase/auth";
// import { auth, db } from "@/app/config/firebase";
import { auth, db } from "@/app/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Content from "@/components/Content"
import SideBar from "@/components/SideBar";
import useStore from '@/store/useStore'
import PostCard2 from "@/components/PostCard2";

export default function Home() {
    const cookies = new Cookies();
    const messagesRef = collection(db, "messages");

    const [allRooms, setAllRooms] = useState([]);
    const { showSidebar, setShowSidebar } = useStore();





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
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

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
    //             <Auth setIsAuth={setIsAuth} />
    //         </div>
    //     );
    // }
    return (
        <div className="flex relative">
            <SideBar />

            <div className={`${showSidebar ? "w-[100vw]" : ""} flex justify-center items-center w-full`}>

                <Content />
            </div>

        </div >
    );
}
