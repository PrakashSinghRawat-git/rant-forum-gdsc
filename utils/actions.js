import { db } from "@/app/config/firebase";
import { collection, getDocs, getDoc, addDoc, doc } from "@firebase/firestore";

// import { storage } from "@/app/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Function to fetch data from Firestore
export const fetchAllPosts = async () => {

    try {
        const postData = [];
        const postRef = collection(db, 'posts');
        const querySnapshot = await getDocs(postRef);

        querySnapshot.forEach((post) => {
            postData.push({ id: post.id, ...post.data() });
        });


        return postData;
    } catch (error) {
        console.error('Error fetching posts...: ', error);
        return [];
    }
};

// Function to fetch one post from Firestore
export const fetchOnePost = async (postId) => {
    try {

        const postRef = doc(db, 'posts', postId);

        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
            return { id: postSnapshot.id, ...postSnapshot.data() };
        } else {

            return null;
        }
    } catch (error) {
        console.error('Error fetching post by ID: ', error);
        return null; // You can handle errors appropriately in your application
    }
};


// function to upload document to firestore

export const createPost = async ({
    title,
    description,
    likes = 10,
    comments = 10,
    uploaderName = "temp uploader",
    uploaderRef = "temp uploader ref",
    commentsRef =""

}) => {
    try {
        const postRef = await addDoc(collection(db, "posts"), {
            title,
            description,
            likes,
            comments,
            uploaderName,
            uploaderRef,
            commentsRef

        });
        return postRef; // Return the ID of the newly created document
    } catch (error) {
        console.error("Error creating rant: ", error);
        throw error; // Handle the error as needed
    }
};
