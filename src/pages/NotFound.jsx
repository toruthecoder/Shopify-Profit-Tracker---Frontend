import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            <h1 className="mb-4 text-3xl  font-bold text-black">
                404 Page Not Found
            </h1>
            <h2 className="mb-8 text-3xl  text-black">
                Hah! Got YOU.
            </h2>
            <Link
                to="/"
                className="border rounded-md bg-black p-3 text-white hover:bg-[#494d4f] duration-500 cursor-pointer"
            >
                Go Back
            </Link>
        </div>
    );
}

export default NotFound;