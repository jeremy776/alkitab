'use client';

import { useState } from "react";

export default function Ayat({
    verse
}: {
    verse: {
        verse: number;
        content: string;
    }
}) {
    const [isActive, setIsActive] = useState(false);
    return (
        <div onClick={() => {
            setIsActive(!isActive);
        }} className={"px-3 my-1 rounded-lg cursor-pointer py-.5 transition-all ease-in "+(isActive ? "bg-blue-200 text-blue-700" : "")}>
            <p className="text-lg">
                <p className="text-xs inline mr-1 ml-2 font-bold">{verse.verse}</p>
                {verse.content}</p>
        </div>
    )
}