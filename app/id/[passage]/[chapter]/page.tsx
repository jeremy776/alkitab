
import Chapter from "@/components/Alkitab/Chapter";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { preload } from "react-dom";
import { FiAlignLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useSWR from "swr";

export default function Home({
  params
}: {
  params: any
}) {
  // const router = useRouter();
  // const param = useParams() as { passage: string, chapter: string };
  // const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

  // const { data: dataAlkitab, error, isLoading } = useSWR('/api/alkitab/v1/passage/list', fetcher);
  // const dataList = dataAlkitab?.data as AlkitabList[];

  // const { data: ayatListData, error: errorAyat, isLoading: isLoadingAyat } = useSWR(`/api/alkitab/v1/passage/${param.passage}/${param.chapter}`, fetcher, {
  //   suspense: true
  // });
  // const ayatList = ayatListData as Ayat;
  // const [selectedPassage, setSelectedPassage] = useState<any>([]);
  return (
    <main>
      <Chapter params={params} />
      {/* <button
        className="bg-white fixed z-2 translate-y-80 translate-x-4 shadow-md rounded-full">
        <FiChevronLeft className="w-10 h-10 p-2" />
      </button>
      <button 
      // onClick={() => {
      //   // const index = dataList?.findIndex((data) => data.abbr.toLowerCase().replace(/ /g, '') === param.passage);
      //   // if (param.chapter == dataList?.[index!].chapter.toString()) {
      //   //   if (index === dataList?.length! - 1) return;
      //   //   const nextPassage = dataList?.[index! + 1].abbr.toLowerCase().replace(/ /g, '');
      //   //   router.push(`/id/${nextPassage}/1`);
      //   // } else {
      //   //   console.log(Number(param.chapter) + 1);
      //   //   router.push(`/id/${param.passage}/${Number(param.chapter) + 1}`);
      //   // }

      // }}
       className="bg-white fixed z-2 right-0 translate-y-80 -translate-x-4 shadow-md rounded-full">
        <FiChevronRight className="w-10 h-10 p-2" />
      </button>
      {/* </div> *

      <div className="flex items-center justify-center">
        <div className="py-5 max-w-2xl">
          <div className="mb-10">
            <div className="flex justify-around items-center">
              <select onChange={(e) => {
                // console.log(e.target.value);
                // router.push(`/id/${e.target.value}/1`);
              }} className="bg-white border-2 border-blue-200 rounded-md px-2 py-1" name="passage" id="passage">
                {/* {dataList?.map((item, index) => {
                  return (
                    <option key={index} selected={item.abbr.toLowerCase().replace(/ /g, '') == param.passage ? true : false} value={item.abbr.toLowerCase().replace(/ /g, '')}>{item.name}</option>
                  )
                })} *
              </select>
              <select onChange={(e) => {
                // router.push(`/id/${param.passage}/${e.target.value}`);
              }} className="bg-white border-2 border-blue-200 rounded-md px-2 py-1" name="chapter" id="chapter">
                {/* {Array.from(Array(dataList?.find((item) => item.abbr.toLowerCase().replace(/ /g, '') == param.passage)?.chapter).keys()).map((_, index) => {
                  return (
                    <option key={index} selected={index + 1 == Number(param.chapter) ? true : false} value={index + 1}>{index + 1}</option>
                  )
                })} *
              </select>
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold uppercase">
            {/* {ayatList?.book.name} {ayatList?.book.chapter} *
          </h2>
          <div className="mt-2">
            {/* {ayatList?.verses.map((verse, index) => {
              if (verse.type === "title") {
                return (
                  <div key={index} className="text-center px-3 py-5">
                    <p className="text-xl font-bold">{verse.content}</p>
                  </div>
                )
              } *

              let isSelected = selectedPassage.includes(verse.verse);

              return (
                {/* <div onClick={() => {
                  // check if verse already selected then remove it from array
                  // if (selectedPassage.includes(verse.verse)) {
                  //   setSelectedPassage(selectedPassage.filter((item: number) => item !== verse.verse));
                  // } else {
                  //   setSelectedPassage([...selectedPassage, verse.verse]);
                  // }
                }}  */}
                {/* // key={index} */}
                {/* //  className={"px-3 my-1 rounded-lg cursor-pointer py-.5 transition-all ease-in " + (isSelected ? "bg-blue-200 text-blue-700" : "")}> */}
                  {/* <p className="text-lg"> */}
                    {/* <p className="text-xs inline mr-1 ml-2 font-bold">{verse.verse}</p> */}
                    {/* {verse.content}</p> */}
                {/* </div> */}
              )
            {/* })} *
          </div>
        </div>
      </div> */}
    </main>
  );
}

// cek apakah ada angka yang sama di antara array selectedPassage dan verse.verse
function isSelected(selectedPassage: number[], verse: number) {
  return selectedPassage.includes(verse);
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