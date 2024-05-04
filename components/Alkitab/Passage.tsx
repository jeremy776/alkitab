import PassageButon from "./PassageButton";

export default async function Passage({
    params
}: {
    params: any
}) {
    const datsa = await fetch("https://alkitab-ecru.vercel.app/api/alkitab/v1/passage/list");
    const data = await datsa.json();
    const pathname = params ? params.passage : "";

    const filterData = data?.data.filter((item: AlkitabList) => {
        return item.abbr.replace(/ /g, '').toLowerCase() === pathname?.replace(/ /g, '');
    });
    const dataList = filterData.length > 0 ? filterData[0] : { chapter: 0, no: 0 };
    const chapter = dataList.chapter;
    const no = dataList.no;
    return (
        <>
            {Array.from(Array(chapter).keys()).map((_, index) => (
                <PassageButon className={(no <= 39 ? "text-red-700 bg-red-100 " : "text-blue-700 bg-blue-100")} key={index} index={index} pathname={pathname}>
                    <h1 className="md:hidden">{index + 1}</h1>
                    <h1 className="hidden md:block">{index + 1}</h1>
                </PassageButon>
            ))}
        </>
    )
}

type AlkitabList = {
    no: number;
    abbr: string;
    name: string;
    chapter: number;
}