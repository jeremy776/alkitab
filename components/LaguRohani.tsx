'use client';

import { useRouter } from "next/navigation";

export default function LaguRohani() {
  const router = useRouter();
  return (
    <div onClick={() => {
      router.push('/lagu');
    }} className="cursor-pointer card shadow-sm border group hover:bg-blue-500 hover:shadow-xl transition-all ease-linear">
      <div className="card-body">
        <h2 className="card-title group-hover:text-white">Kumpulan Lagu Rohani</h2>
        <p className="text-gray-500 group-hover:text-gray-300">
          Dengarkan lagu rohani untuk menenangkan jiwa
        </p>
      </div>
    </div>
  )
}