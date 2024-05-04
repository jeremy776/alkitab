'use client'

import { useRouter } from "next/navigation"

export default function NavAyat({
    dataList,
    param
}: {
    param: any,
    dataList: any
}) {
    const router = useRouter();
    return (
        <div>
            <select defaultValue={
                param.passage
            } onChange={(e) => {
                router.push(`/id/${e.target.value}/1`);
            }}>
                {dataList?.map((item: any, index: number) => {
                    return (
                        <option key={index} value={item.abbr.toLowerCase().replace(/ /g, '')}>{item.name}</option>
                    )
                })}
            </select>
        </div>
    )
}