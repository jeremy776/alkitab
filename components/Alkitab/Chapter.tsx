import Ayat from "./Ayat";
import NavigationAyat from "./NavigationAyat";

export default async function Chapter({
    params
}: {
    params: any
}) {
    console.log(params);
    const dataAlkitabReq = await fetch("https://alkitab-ecru.vercel.app/api/alkitab/v1/passage/list");
    const dataAlkitab = await dataAlkitabReq.json();
    const dataList = dataAlkitab?.data as AlkitabList[];
    const ayatListreq = await fetch(`https://alkitab-ecru.vercel.app/api/alkitab/v1/passage/${params.passage}/${params.chapter}`);
    const ayatList = await ayatListreq.json() as Ayat;
    return (
        <div className="flex items-center justify-center">
            <div className="py-5 max-w-2xl">
                <div className="mb-10">
                    <div className="flex justify-around items-center">
                        <NavigationAyat param={params} dataList={dataList} />
                    </div>
                </div>
                <h2 className="text-center text-2xl font-bold uppercase">
                    {ayatList?.book.name} {ayatList?.book.chapter}
                </h2>
                <div className="mt-2">
                    {ayatList?.verses.map((verse, index) => {
                        if (verse.type === "title") {
                            return (
                                <div key={index} className="text-center px-3 py-5">
                                    <p className="text-xl font-bold">{verse.content}</p>
                                </div>
                            )
                        }

                        return (
                            <Ayat key={index} verse={verse} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
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