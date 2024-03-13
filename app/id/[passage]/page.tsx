import Passage from "@/components/Alkitab/Passage";

export default function PassageIndex({
  params
}: {
  params: any
}) {
  return (
    <main className="pt-2">
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 px-3 pb-20 ">
        <Passage params={params} />
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