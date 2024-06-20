"use client"
import {useState} from "react";
import {likeBookById} from "@/action/bookActions";

interface SingleBookProps {
    title: string,
    author: string,
    likes: number,
    id: number,
}

const SingleBook = ({id, author, likes, title}: SingleBookProps) => {
    const [currentLikes, setCurrentLikes] = useState(likes);
    return (
        <div className="border-4 border-gray-200 shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{title} by {author}</h2>
            <div className="flex flex-row gap-4 items-center justify-center">
                <p className="text-gray-700 text-center flex justify-center items-center">
                    Total likes: {currentLikes}
                </p>
                {/* Inlined thumbs up SVG */}
                <svg onClick={() => {
                    likeBookById(id)
                        .then(r => setCurrentLikes(r.likes))
                }}
                     style={{cursor: "pointer"}}
                     xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     fill="none"
                     stroke="#2c3e50"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="1.5"
                     viewBox="0 0 24 24"
                >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <path
                        d={"M7 11v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-7a1 1 0 011-1h3a4 4 " +
                            "0 004-4V6a2 2 0 014 0v5h3a2 2 0 012 2l-1 5a2 3 0 01-2 2h-7a3 3 0 01-3-3"}>
                    </path>
                </svg>
            </div>
            {/* End of thumbs up SVG */}
        </div>
    );
};


export default SingleBook;