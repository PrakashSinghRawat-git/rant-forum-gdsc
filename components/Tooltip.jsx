import React from "react";

function Tooltip() {
    return (
        <>
            <div>
                <div className="py-2 ">
                    <div className="mx-auto container max-w-[228px] px-2 py-2 bg-white rounded relative">
                        <p className="text-sm font-semibold leading-none text-gray-800">
                            Prakash Rawat
                        </p>
                        <p className=" text-xs leading-none text-gray-600 pt-2 pb-2">
                            Hello! I made this...Click to know more about me
                        </p>
           
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tooltip;
