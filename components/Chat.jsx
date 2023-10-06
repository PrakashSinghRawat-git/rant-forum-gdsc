import React, { useEffect, useState } from "react";
import {
    addDoc,
    getDocs,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { auth, db } from "@/app/config/firebase";

const Chat = ({ room }) => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [numberOfUniqueUsers, setNumberOfUniqueUsers] = useState(0);
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const countUniqueUsers = async () => {
            const users = await getDocs(messagesRef);
            const uniqueUsers = new Set();

            users.forEach((doc) => {
                const user = doc.data().user;
                uniqueUsers.add(user);
            });

            const numberOfUniqueUsers = uniqueUsers.size;
            setNumberOfUniqueUsers(numberOfUniqueUsers);
            console.log("Number of unique users:", numberOfUniqueUsers);
        };

        countUniqueUsers();
    }, []);

    useEffect(() => {
        // onsnapshot will help firebase to listen to changes in collection
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });

        // clean up of useeffect - IMPORTANT fro subscriptions, timers, event listeners
        return () => unsubscribe;
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // console.log(newMessage);

            const newMessageObj = {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room: room,
            };

            if (newMessage === "") return;
            const response = await addDoc(messagesRef, newMessageObj);
            setNewMessage("");

            console.log(response);
        } catch (err) {
            console.log("error: ", err);
        }
    };
    return (
        <div className="chat-app p-3">
            <div>
                total users who have visited this site: {numberOfUniqueUsers}
            </div>
            <div>
                <h1 className="text-3xl font-bold ">Welcome to: {room}</h1>
            </div>
            <div className="border-3 border-g bg-green-300 p-1">
                {messages.map((message) => (
                    <div key={message.id}>
                        <div className="m-1 p-1 bg-sky-200">
                            <span className="font-semibold">
                                {message.user}:{" "}
                            </span>{" "}
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <form
                onSubmit={handleSubmit}
                className="new-message-form  p-3 bg-slate-300"
            >
                <input
                    type="text"
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
