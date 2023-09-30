import React from "react";

export default function SearchComponent(props) {
    return (
        <div className="flex items-center">
            <div className="flex border border-purple-200 rounded">
                <input
                    type="text"
                    className="block w-full px-20 py-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                    placeholder={props.placeholder}
                    
                />
                <button className="px-4 text-white bg-black border-l rounded ">
                    {props.title}
                </button>
            </div>
        </div>
    );
}
