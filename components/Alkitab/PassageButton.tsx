'use client';
import { useRouter } from "next/navigation";

export default function PassageButon({
    className,
    pathname,
    index,
    children
}: {
    children: React.ReactNode,
    className?: string,
    pathname: string | undefined,
    index: number
}) {
    const router = useRouter();
    return (
        <button onClick={() => {
            router.push(`/id/${pathname}/${index + 1}`);
        }}
        className={className + " flex items-center mb-2 py-2 justify-center group hover:shadow-sm transition-all ease-linear rounded-xl"}
        >
            {children}
        </button>
    )
}