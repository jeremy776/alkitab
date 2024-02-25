'use client';
import { usePathname, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";


export default function Passage() {
  const router = useRouter();
  const pathname = useParams() as { passage: string };

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR('/api/alkitab/v1/passage/list', fetcher);

  const filterData = data?.data.filter((item: AlkitabList) => {
    return item.abbr.replace(/ /g, '').toLowerCase() === pathname.passage.replace(/ /g, '');
  });
  const dataList = filterData ? filterData[0] : { chapter: 0, no: 0 };
  const chapter = dataList.chapter;
  const no = dataList.no;
  return (
    <main className="pt-2">
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 px-3 pb-20 ">

        {Array.from(Array(chapter).keys()).map((_, index) => (
          <button onClick={() => {
            router.push(`/id/${pathname.passage}/${index + 1}`);
          }} key={index} className={(no <= 39 ? "text-red-700 bg-red-100 " : "text-blue-700 bg-blue-100") + " flex items-center mb-2 py-2 justify-center group hover:shadow-sm transition-all ease-linear rounded-xl"}>
            <h1 className="md:hidden">{index + 1}</h1>
            <h1 className="hidden md:block">{index + 1}</h1>
          </button>
        ))}
      </div>
    </main>
  );
}

async function getAlkitabList(passage: string) {
  const list = await fetch('/api/alkitab/v1/passage/list');
  const dataList = await list.json();
  const data = dataList.data;

  const filteredData = data.filter((item: AlkitabList) => {
    return item.abbr.replace(/ /g, '').toLowerCase() === passage.replace(/ /g, '');
  });

  return filteredData[0];
}

type AlkitabList = {
  no: number;
  abbr: string;
  name: string;
  chapter: number;
}