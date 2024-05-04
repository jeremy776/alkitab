'use client'
import { useRouter } from "next/navigation"

export default function BacaAlkitab() {
  const router = useRouter();
  return (
    <div onClick={() => {
      router.push("/id");
    }} className="cursor-pointer card shadow-sm border group hover:bg-blue-500 hover:shadow-xl transition-all ease-linear">
      <div className="card-body">
        <h2 className="card-title group-hover:text-white">Baca alkitab</h2>
        <p className="text-gray-500 group-hover:text-gray-300">
          Baca Alkitab dalam berbagai versi bahasa dan terjemahan
        </p>
      </div>
    </div>
  )
}