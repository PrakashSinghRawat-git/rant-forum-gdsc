import { create } from "zustand";

const formStore = create((set) => ({
    // Function to toggle the showSideBar value
    showSidebar: false,
    setShowSidebar: (value) => {
        set({ showSidebar: value });
    },

    // for storing active rant/post data
    activePost: {},
    setActivePost: (post) => {
        set({ activePost: post });
    },
}));

export default formStore;
