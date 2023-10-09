import { create } from "zustand";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const formStore = create((set) => ({
    // Function to toggle the showSideBar value
    showSidebar: false,
    setShowSidebar: (value) => {
        set({ showSidebar: value });
    },

    isCreateRant: false,
    setIsCreateRant: (value) => {
        set({ isCreateRant: value });
    },

    // for storing active rant/post data
    activePost: {},
    setActivePost: (post) => {
        set({ activePost: post });
    },

    // all posts data
    postData: [],
    setPostData: (data) => {
        set({ postData: data });
    },

    // for authentication
    isAuth: cookies.get("auth-token"),
    setIsAuth: (value) => {
        set({ isAuth: value });
    },

    currentUserObj: {},
    setCurrentUserObj: (userObj) => {
        set({ currentUserObj: userObj });
    },
}));

export default formStore;
