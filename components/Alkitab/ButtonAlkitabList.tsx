'use client'

import { useRouter } from "next/navigation";

export default function ButtonAlkitabList({
    data,
    className
}: {
    data: {
        no: number;
        abbr: string;
        name: string;
        chapter: number;
    },
    className?: string
}) {
    const router = useRouter();
    return (
        <button onClick={() => {
            router.push(`/id/${data.abbr.replace(/ /g, '').toLowerCase()}/`)
        }} className={className + " flex items-center mb-2 py-2 justify-center group hover:shadow-sm transition-all ease-linear rounded-xl"}>
            <h1 className="md:hidden">{data.abbr}</h1>
            <h1 className="hidden md:block">{data.name}</h1>
        </button>
    )
}