'use client';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { preload } from "react-dom";
import { FiAlignLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();
  const param = useParams() as { passage: string, chapter: string };
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

  const { data: dataAlkitab, error, isLoading } = useSWR('/api/alkitab/v1/passage/list', fetcher);
  const dataList = dataAlkitab?.data as AlkitabList[];

  const { data: ayatListData, error: errorAyat, isLoading: isLoadingAyat } = useSWR(`/api/alkitab/v1/passage/${param.passage}/${param.chapter}`, fetcher, {
    suspense: true
  });
  const ayatList = ayatListData as Ayat;

  // useEffect(() => {
  //   function fetchData() {
  //     const index = dataList?.findIndex((data) => data.abbr.toLowerCase().replace(/ /g, '') === param.passage);
  //     if (param.chapter == dataList?.[index!].chapter.toString()) {
  //       if (index === dataList?.length! - 1) return;
  //       const nextPassage = dataList?.[index! + 1].abbr.toLowerCase().replace(/ /g, '');
  //       preload(`/id/${nextPassage}/1`);
  //       router.prefetch(`/id/${nextPassage}/1`);
  //     } else {
  //       console.log(Number(param.chapter) + 1);
  //       preload(`/id/${param.passage}/${Number(param.chapter) + 1}`);
  //       router.prefetch(`/id/${param.passage}/${Number(param.chapter) + 1}`);
  //     }
  //   }
  //   // fetchData();
  // }, [param]);

  return (
    <main>
      <div className="z-[900000000] fixed flex justify-between w-full h-[90vh] items-center px-4">
        <button
          onClick={() => {
            const index = dataList?.findIndex((data) => data.abbr.toLowerCase().replace(/ /g, '') === param.passage);

            if (param.chapter == '1') {
              if (index === 0) return;
              const nextPassage = dataList?.[index! - 1].abbr.toLowerCase().replace(/ /g, '');
              const lastChapter = dataList?.[index! - 1].chapter;
              router.push(`/id/${nextPassage}/${lastChapter}`);
            } else {
              router.push(`/id/${param.passage}/${Number(param.chapter) - 1}`);
            }
          }}
          className="bg-white shadow-md rounded-full">
          <FiChevronLeft className="w-10 h-10 p-2" />
        </button>
        <button onClick={() => {
          const index = dataList?.findIndex((data) => data.abbr.toLowerCase().replace(/ /g, '') === param.passage);
          if (param.chapter == dataList?.[index!].chapter.toString()) {
            if (index === dataList?.length! - 1) return;
            const nextPassage = dataList?.[index! + 1].abbr.toLowerCase().replace(/ /g, '');
            router.push(`/id/${nextPassage}/1`);
          } else {
            console.log(Number(param.chapter) + 1);
            router.push(`/id/${param.passage}/${Number(param.chapter) + 1}`);
          }

        }} className="bg-white shadow-md rounded-full">
          <FiChevronRight className="w-10 h-10 p-2" />
        </button>
      </div>

      <div className="py-10">
        <h2 className="text-center text-2xl font-bold uppercase">
          {ayatList?.book.name} {ayatList?.book.chapter}
        </h2>
        <div className="mt-5">
          {ayatList?.verses.map((verse, index) => {
            if (verse.type === "title") return (
              <div key={index} className="text-center px-3 py-10">
                <p className="text-xl font-bold">{verse.content}</p>
              </div>
            )

            return (
              <div key={index} className="px-3 py-1.5">
                <p className="text-lg">
                  <p className="text-xs inline-flex mr-1 ml-2 font-bold">{verse.verse}</p>
                  {verse.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}

async function getAyatList(passage: string, chapter: string) {
  passage = passage.replace(/_/g, " ");
  const list = await fetch(`/api/alkitab/v1/passage/${passage}/${chapter}`);
  const dataList = await list.json();
  return dataList;
}

async function getAlkitabListFiltered(passage: string) {
  const list = await fetch('/api/alkitab/v1/passage/list');
  const dataList = await list.json();
  const data = dataList.data;

  const filteredData = data.filter((item: AlkitabList) => {
    return item.abbr.replace(/ /g, '').toLowerCase() === passage.replace(/ /g, '');
  });

  return filteredData[0];
}

async function getAlkitabList() {
  const list = await fetch('/api/alkitab/v1/passage/list');
  const dataList = await list.json();
  return dataList.data;
}

type AlkitabList = {
  no: number;
  abbr: string;
  name: string;
  chapter: number;
}

type Ayat = {
  book: {
    chapter: number;
    name: string;
    no: number;
  },
  verses: {
    content: string;
    type: string;
    verse: number;
  }[];
}