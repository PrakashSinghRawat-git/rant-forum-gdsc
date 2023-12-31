import React, { useState } from "react";
import useStore from "@/store/useStore";
import Image from "next/image";
import { handleSignOut, handleSignIn } from "@/utils/handlers";
import { toast } from "react-toastify";
import { updateUser } from "@/utils/db";
import Link from "next/link";
import Tooltip from "@/components/Tooltip";

export default function SideBar() {
    const [isAnonymousPopoverOpen, setIsAnonymousPopoverOpen] = useState(false);

    let menuArray = [true, false, false];
    const [menu, setMenu] = useState(menuArray);
    const [anonymousName, setAnonymousName] = useState("");
    const {
        showSidebar,
        setShowSidebar,
        isCreateRant,
        setIsCreateRant,
        currentUserObj,
        setCurrentUserObj,
        isAuth,
        setIsAuth,
    } = useStore();

    const setMenuValue = (props) => {
        let newArr = [...menu];
        newArr[props] = !newArr[props];
        setMenu(newArr);
    };
    console.log(showSidebar);

    const createRantHandle = () => {
        setIsCreateRant(true);
    };

    const handleSetAnonymousName = async (e) => {
        e.preventDefault();
        if (!isAuth) {
            toast.warning("please first sign in...");
            await handleSignIn({
                isAuth,
                setIsAuth,
                setCurrentUserObj,
            });
            return;
        }
        if (anonymousName === "") {
            toast.warning("please first write something to rant...");
            return;
        }
        // Update the anonymouseName field of a user document with the specified email
        const userEmail = currentUserObj?.email;
        const fieldsToUpdate = {
            anonymousName: anonymousName,
        };

        console.log("Updating user: ", userEmail, fieldsToUpdate);
        try {
            await updateUser(userEmail, fieldsToUpdate);
            toast.success("User updated successfully!");
            setCurrentUserObj({
                ...currentUserObj,
                anonymousName: anonymousName,
            });
            setIsAnonymousPopoverOpen(false);
            console.log("User updated successfully!" + currentUserObj);
        } catch (error) {
            toast.error("Error updating user: ");
            console.error("Error updating user: ", error);
        }
    };

    return (
        <>
            <div
                className={`${
                    isAnonymousPopoverOpen ? "visible" : "hidden"
                } absolute justify-center flex left-[50%] z-50 transform -translate-x-1/2 incognitoPopover bg-black-200 p-5 my-2`}
            >
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password pr-1"
                            >
                                Anonymous Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                id="anonymousName"
                                name="anonymousName"
                                value={anonymousName}
                                onChange={(e) => {
                                    setAnonymousName(e.target.value);
                                    console.log(anonymousName);
                                }}
                            />
                            <p className="text-gray-600 text-xs italic">
                                You will appear with this name in all posts,
                                comments and messages even the past one.
                            </p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3">
                            <button
                                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                onClick={handleSetAnonymousName}
                            >
                                Update
                            </button>
                        </div>
                        <div className="md:w-2/3" />
                    </div>
                </form>
            </div>
            <div
                className={`${
                    showSidebar ? "visible" : "hidden"
                }  sidebar z-10  fixed md:black h-[100vh] mr-5`}
            >
                <div
                    id="Main"
                    className={`${
                        showSidebar ? "translate-x-0" : "-translate-x-full"
                    } xl:rounded-r transform xl:translate-x-0 ease-in-out transition-transform duration-500 flex justify-start items-start h-full  sm:w-65 bg-gray-900 flex-col relative`}
                >
                    <div className=" flex justify-between items-center w-full border-b border-gray-mt-6   my-5  pb-2">
                        <div className="flex justify-center items-center  space-x-2 pl-4">
                            <div>
                                <Image
                                    className="rounded-full"
                                    src={
                                        "https://robohash.org/" +
                                            Math.random() +
                                            ".png" ||
                                        "https://i.imgur.com/6VBx3io.png"
                                    }
                                    alt="avatar"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className="flex justify-start flex-col items-start">
                                <p className="cursor-pointer text-sm leading-5 text-white">
                                    {currentUserObj?.anonymousName ||
                                        currentUserObj?.name}
                                </p>
                                {currentUserObj?.anonymousName && (
                                    <p className="cursor-pointer text-xs leading-3 text-gray-300">
                                        {currentUserObj?.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            aria-label="close"
                            id="close"
                            onClick={() => setShowSidebar(false)}
                            className={`${
                                showSidebar ? "" : "hidden"
                            } focus:outline-none focus:ring-2`}
                        >
                            <svg
                                width={30}
                                height={30}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 6L18 18"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={() =>
                            setIsAnonymousPopoverOpen(!isAnonymousPopoverOpen)
                        }
                        className="flex jusitfy-start items-center space-x-5 w-full  focus:outline-none  focus:text-indigo-400 cursor-pointer text-white rounded pl-4  border-b border-gray-mt-6 pb-2"
                    >
                        <Image
                            src="/incognito.png"
                            width={30}
                            height={30}
                            alt="incognito"
                            className="text-white"
                        ></Image>
                        <p>Become Anonymous</p>
                    </button>
                    <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
                        <button
                            className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
                            onClick={createRantHandle}
                        >
                            <svg
                                className="fill-stroke "
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-base leading-4 ">Create Rant</p>
                        </button>
                        <button
                            className={`flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  ${
                                isAuth
                                    ? "hover:text-red-400 font-semibold  text-red-500 rounded"
                                    : "hover:text-blue-400 text-blue-500"
                            }`}
                            onClick={
                                isAuth
                                    ? () => {
                                          handleSignOut({
                                              isAuth,
                                              setIsAuth,
                                              setCurrentUserObj,
                                          });
                                      }
                                    : () =>
                                          handleSignIn({
                                              isAuth,
                                              setIsAuth,
                                              setCurrentUserObj,
                                          })
                            }
                        >
                            {/* <Image
                            src="/signOut.png"
                            alt="sign out"
                            width={20}
                            height={20}
                        ></Image> */}
                            <div className="w-[20px] h-[20px] rounded-full bg-red ml-1">
                                &nbsp;
                            </div>
                            <p className="text-base leading-4 ">
                                {isAuth ? "Sign Out" : "Sign In"}
                            </p>
                        </button>
                    </div>
                    <div className="mt-6 group relative flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
                        <Link
                            href="https://prakash-rawat.vercel.app/"
                            className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded "
                            target="_blank"
                        >
                            <Image
                                width={24}
                                height={24}
                                src="/psrlogo.png"
                                alt="developer"
                            ></Image>
                            <p className="text-base leading-4 text-gradient_blue-purple hover:text-white-800">
                                About Developer
                            </p>
                            <div className="absolute top-10 scale-0 group-hover:scale-100">
                                <Tooltip />
                            </div>
                        </Link>
                    </div>
                    {/* <div className="flex-col justify-between">
                    <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
                        <button
                            onClick={() => setMenuValue(0)}
                            className="focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14  "
                        >
                            <p className="text-sm leading-5  uppercase">
                                Profile Overview
                            </p>
                            <svg
                                id="icon1"
                                className={`${
                                    menu[0] ? "" : "rotate-180"
                                } transform duration-100`}
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 15L12 9L6 15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <div
                            id="menu1"
                            className={`${
                                menu[0] ? "flex" : "hidden"
                            } justify-start  flex-col w-full md:w-auto items-start pb-1 `}
                        >
                            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                                <svg
                                    className="fill-stroke"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="text-base leading-4  ">
                                    Messages
                                </p>
                            </button>
                            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.85 12.15L19 4"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18 5L20 7"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15 8L17 10"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="text-base leading-4  ">
                                    Security
                                </p>
                            </button>
                            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4 6H12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M16 6H20"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4 12H6"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 12H20"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4 18H15"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19 18H20"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="text-base leading-4  ">
                                    Settings
                                </p>
                            </button>
                            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="text-base leading-4  ">
                                    Notifications
                                </p>
                            </button>
                            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17 11H7C5.89543 11 5 11.8955 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8955 18.1046 11 17 11Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="text-base leading-4  ">
                                    Passwords
                                </p>
                            </button>
                            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 21H12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 21V3"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 4L19 8L10 12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="text-base leading-4  ">Goals</p>
                            </button>
                        </div>
                    </div>
                </div> */}
                </div>
            </div>
        </>
    );
}
