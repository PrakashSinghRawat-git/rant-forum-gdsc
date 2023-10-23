import { db } from "@/app/config/firebase";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where } from "@firebase/firestore";
import { formatDate } from "@/utils/helper"

// getting user with given email and getting user document id
export const getUser = async (email) => {
    try {


        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("user does not exist")
            return null;
        }
        else {
            console.log("user doc is: " + querySnapshot.docs[0])
            return querySnapshot.docs[0]
        }
    } catch (error) {
        console.log("error getting user", error)
        throw error;
    }
}

// function to add a new user to firestore
export const addUser = async ({
    name, email, photoUrl

}) => {
    try {

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            const newUser = {
                name, email, photoUrl, anonymouseName: ""
            }
            console.log("query snap shot is ", querySnapshot)
            const userRef = await addDoc(collection(db, "users"), newUser);
            console.log('new user created with id: ', userRef.id)
            return userRef; // Return the ID of the newly created document
        } else {
            console.log("user already exists")
            return querySnapshot.docs[0]
        }


    } catch (error) {
        console.error("Error creating user: ", error);
        throw error; // Handle the error as needed
    }
};

// update user
export const updateUser = async (email, fieldsToUpdate) => {
    try {
        // Query Firestore to find the user document with the specified email
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // If a user with the specified email exists, update their fields
            const userId = querySnapshot.docs[0].id;
            const userRef = doc(db, 'users', userId);

            // Use the updateDoc method to update specific fields of the user document
            await updateDoc(userRef, fieldsToUpdate);

            console.log('User updated successfully');
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error updating user: ', error);
        throw error;
    }
};

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
    }x
};

// function to upload document to firestore
export const createPost = async ({
    title,
    description,
    name,
    email,


}) => {

    // getting user with given email
    const userDoc = await getUser(email);

    const postObj = {
        title,
        description,
        likes: 0,
        likedBy: [],
        comments: 0,
        uploaderName: name,
        uploaderRef: userDoc.id,
        commentsRef: "",
        createdOn: formatDate(new Date()),


    }
    try {
        const postRef = await addDoc(collection(db, "posts"), postObj);
        return postRef; // Return the newly created document
    } catch (error) {
        console.error("Error creating rant: ", error);
        throw error; // Handle the error as needed
    }
};

// function to create or update comments
export const addComment = async (postId, commentsRef, commentData) => {

    // first check if comment section is available for given post
    if (commentsRef) {
        try {
            const commentDoc = await getDoc(doc(db, "comments", commentsRef));
            if (commentDoc.exists()) {
                // If the document exists, update it by adding the new comment to the commentArray
                const updatedCommentArray = [...commentDoc.data().commentArray, commentData];

                await setDoc(doc(db, "comments", commentsRef), {
                    commentArray: updatedCommentArray
                }, { merge: true });

                console.log('new comment updated with id: ', commentDoc.id)
                return updatedCommentArray;
            }

        } catch (error) {
            console.log("error updating new comment...", error)
            throw error;
        }
    } else {
        // if comment section does not exists
        try {
            // create a new comment section for given post
            commentsRef = await addDoc(collection(db, 'comments'), {
                commentArray: [
                    commentData
                ],
                postRef: postId
            })
            console.log("commentsRef id is : ", commentsRef.id)
            // setting the comment section id in post document
            await setDoc(doc(db, "posts", postId), {
                commentsRef: commentsRef.id
            }, { merge: true });




            console.log('new comment created with id: ', + commentsRef)
            return commentsRef
        } catch (error) {
            console.log("error creating new comment...", error)
            throw error;
        }
    }
}

//function to fetch all comments for a given post (with commentsRef)
export const fetchPostComments = async (commentsRef) => {
    try {

        const postSnapshot = await getDoc(doc(db, 'comments', commentsRef));

        return { id: postSnapshot.id, ...postSnapshot.data() };


    } catch (error) {
        console.error('Error fetching comments...: ', error);
        return [];
    }
}

// adding likes
export const addLike = async (postId, email) => {
    // first checking if the user has already liked the post
    // we will check if the user's ID is present in the likedBy array field of the post document
    console.log("post id is ", postId);
    console.log("email is ", email);

    try {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);

        const userDoc = await getUser(email);
        const userId = userDoc.id;

        if (postSnapshot.exists()) {
            const likedBy = postSnapshot.data().likedBy;
            if (!(likedBy.includes(userId))) {
                // if the user has not liked the post, add the like and increment the "likes" field of the post document
                const updatedLikedBy = [...likedBy, userId];
                const currentLikes = postSnapshot.data().likes; // Get the current number of likes
                await setDoc(doc(db, "posts", postId), {
                    likedBy: updatedLikedBy,
                    likes: currentLikes + 1 // Increment the likes field
                }, { merge: true });

                console.log('new like added with id: ', postSnapshot.id)
                return 1;
            }
        } else {
            console.log('post does not exist')
            return 0;
        }
    } catch (error) {
        console.log("error adding like...", error);
        throw error;
    }
}

export const updateVisitorCount = async ()=>{
    const visitorsDocID = process.env.NEXT_PUBLIC_VISITORS_DOC_ID
    try{
        const visitorDocRef = doc(db, 'visitors', visitorsDocID);
        const visitorSnapshot = await getDoc(visitorDocRef);
        const oldCount = visitorSnapshot.data().visitors;
        const newCount = oldCount + 1;
        const res = await updateDoc(visitorDocRef, {visitors: newCount});
        console.log("visitor count updated successfully",res);
        return newCount;
    }catch(error){
        console.log("error getting visitor count...", error);
        throw error;
    }
}

export const getVisitorCount = async ()=>{
    const visitorsDocID = process.env.NEXT_PUBLIC_VISITORS_DOC_ID
    try{
        const visitorDocRef = doc(db, 'visitors', visitorsDocID);
        const visitorSnapshot = await getDoc(visitorDocRef);
        return visitorSnapshot.data().visitors;
    }catch(error){
        console.log("error getting visitor count...", error);
        throw error;
    }
}
