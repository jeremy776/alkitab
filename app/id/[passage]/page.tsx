'use client';
import { usePathname, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Passage() {
  const [chapter, setChapter] = useState<number>(0);
  const [no, setNo] = useState<number>(0);

  const router = useRouter();
  const pathname = useParams() as { passage: string };
  useEffect(() => {
    async function fetchData() {
      const dataList = await getAlkitabList(pathname.passage);
      setChapter(dataList.chapter);
      setNo(dataList.no);
    }
    fetchData();
  }, []);
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