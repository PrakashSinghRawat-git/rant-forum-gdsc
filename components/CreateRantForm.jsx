"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createPost } from "@/utils/actions";

const UploadForm = ({ isCreateRant, setIsCreateRant }) => {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [uploadingStarted, setUploadingStarted] = useState(false);

    const printValues = () => {
        console.log("name: " + name);

        console.log("description: " + description);
    };

    // uploadDocumentTOFirestor function was being called even before the changes in fileUrl take place
    // im using useEffect while will trigger this function iff fileUrl has changed, it is not empty and we have started uploading
    // useEffect(() => {
    //     if (fileUrl.length > 0 && uploadingStarted === true) {
    //         // Upload complete document to Firestore
    //         console.log("fileURl befor adding doc to firestore:" + fileUrl);
    //         uploadDocumentToFirestore({
    //             name,
    //             subject,
    //             courseCode,
    //             creator,
    //             tags,
    //             description,
    //             selectedUnits,
    //             fileUrl,
    //         })
    //             .then((docRef) => {
    //                 toast.success(
    //                     "Document successfully added with id: " + docRef.id
    //                 );

    //                 setUploadingStarted(false);
    //             })
    //             .catch((error) => {
    //                 console.log("Error adding document: ", error);
    //                 toast.error("Error adding document: ");
    //             });
    //     } else {
    //         console.log(
    //             "either fileUrl is empty or uploadingStarted is false: " +
    //                 uploadingStarted +
    //                 fileUrl
    //         );
    //         setUploadingStarted(false);
    //     }
    // }, [fileUrl]); // This useEffect runs whenever fileUrl changes

    const handleCreateRant = async (e) => {
        e.preventDefault();
        try {
            setUploadingStarted(true);

            createPost({
                title,
                description,
            })
                .then((postRef) => {
                    toast.success(
                        "post successfully added with id: " + postRef.id
                    );
                    setTitle("");
                    setDescription("");

                    setUploadingStarted(false);
                })
                .catch((error) => {
                    console.log("Error adding post: ", error);
                    toast.error("Error adding post: ");
                    setUploadingStarted(false);
                });
        } catch (error) {
            console.log("error creating form: " + error);
            toast.error("Error creating form: ");
            setUploadingStarted(false);
        }
    };

    return (
        <>
            <div
                id="popup"
                className="z-50 fixed w-full flex justify-center inset-0 "
            >
                <div className="mx-auto container">
                    <div className="flex items-center justify-center h-full w-full">
                        <div className="bg-white-800 border border-black-100 rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
                            <div className="px-4 md:px-10 ">
                                <form
                                    className="mt-3 shadow-3xl"
                                    onSubmit={handleCreateRant}
                                >
                                    <div className="flex items-center space-x-9">
                                        <input
                                            placeholder="Rant title"
                                            type="string"
                                            value={title}
                                            minLength={5}
                                            required
                                            id="title"
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            className="w-full focus:outline-none 
                                            border-1 placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200 shadow-xl"
                                        />
                                    </div>

                                    <textarea
                                        id="description"
                                        value={description}
                                        minLength="5"
                                        required
                                        className="py-1 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full resize-none focus:outline-none text-black-100"
                                        rows="4"
                                        placeholder="Enter any description..."
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                    <div className="flex items-center justify-between my-3">
                                        <button
                                            onClick={() => {
                                                setIsCreateRant(false);
                                            }}
                                            className="px-6 py-3 bg-red-400 hover:bg-red-300 shadow rounded text-sm text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-indigo-700 hover:bg-opacity-80 shadow rounded text-sm text-white"
                                            // onClick={handleCreateRant}
                                        >
                                            {uploadingStarted
                                                ? "Uploading..."
                                                : "Upload"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadForm;
