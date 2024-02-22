'use client';
import { useRouter } from "next/navigation"
import useSWR from "swr";

export default function Home() {
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR('/api/alkitab/v1/passage/list', fetcher);
  let dataList = data || [];
  if(isLoading) return <div>Loading...</div>

  const router = useRouter();
  return (
    <main className="pt-2">
      <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3 xl:px-20 px-3 pb-20 ">
        {dataList && dataList.data.map((data: AlkitabList) => (
          <button onClick={() => {
            router.push(`/id/${data.abbr.replace(/ /g, '').toLowerCase()}/`);
          }} key={data.no} className={(data.no <= 39 ? "text-red-700 bg-red-100 " : "text-blue-700 bg-blue-100") + " flex items-center mb-2 py-2 justify-center group hover:shadow-sm transition-all ease-linear rounded-xl"}>
            <h1 className="md:hidden">{data.abbr}</h1>
            <h1 className="hidden md:block">{data.name}</h1>
          </button>
        ))}
      </div>
    </main>
  );
}

type AlkitabList = {
  no: number;
  abbr: string;
  name: string;
  chapter: number;
}