"use client";
import useStore from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";
import { handleSignIn, handleSignOut } from "@/utils/handlers";

const Navbar = () => {
    const {
        isAuth,
        setIsAuth,
        setIsCreateRant,
        showSidebar,
        setShowSidebar,
        setCurrentUserObj,
    } = useStore();

    const createRantHandle = () => {
        setIsCreateRant(true);
       
    };

    return (
        <nav className="flex-center top-0 z-50 w-full border-b-2 border-black-200 bg-gray-900 py-7 text-white ">
            <div className="flex-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16">
                <Link href="/">
                    <Image
                        src="/jsm-logo.svg"
                        alt="logo"
                        width={55}
                        height={40}
                    />
                </Link>

                <ul className="flex-center gap-x-3  md:gap-x-10">
                    <li className="hover:border-b hover:border-black-800 transform duration-200 f body-text text-gradient_blue-purple !font-bold  ">
                        <button
                            onClick={
                                isAuth
                                    ? createRantHandle
                                    : () =>
                                          handleSignIn({
                                              isAuth,
                                              setIsAuth,
                                              setCurrentUserObj,
                                          })
                            }
                        >
                            Create
                        </button>
                    </li>

                    {isAuth ? (
                        <li className=" font-normal text-gradient_blue hover:border-b hover:border-black-800 transform duration-200 ">
                            <button
                                onClick={() => {
                                    handleSignOut({
                                        isAuth,
                                        setIsAuth,
                                        setCurrentUserObj,
                                    });
                                }}
                            >
                                Sign Out
                            </button>
                        </li>
                    ) : (
                        <li className="hover:border-b hover:border-black-800 transform duration-200 font-normal text-gradient_blue ">
                            <button
                                onClick={() => {
                                    handleSignIn({
                                        isAuth,
                                        setIsAuth,
                                        setCurrentUserObj,
                                    });
                                }}
                            >
                                Sign In
                            </button>
                        </li>
                    )}
                </ul>
            </div>
            <div
                aria-label="toggler"
                className="flex justify-center items-center mr-5"
            >
                <button
                    aria-label="open"
                    id="open"
                    onClick={() => setShowSidebar(true)}
                    className={`${
                        showSidebar ? "hidden" : ""
                    } focus:outline-none  text-white-800 focus:ring-2`}
                >
                    <Image
                        src="/hamburger-menu.svg"
                        alt="hamburger"
                        width={30}
                        height={30}
                        className="block "
                    ></Image>
                </button>
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
        </nav>
    );
};

export default Navbar;
