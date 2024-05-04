import ButtonAlkitabList from "./ButtonAlkitabList";

export default async function AlkitabList() {
    let data = await fetch("https://alkitab-ecru.vercel.app/api/alkitab/v1/passage/list");
    let alkitabList = await data.json();
    return (
        <>
            {alkitabList.data.map((data: AlkitabList) => (
                <ButtonAlkitabList data={data} key={data.no} className={(data.no <= 39 ? "text-red-700 bg-red-100 " : "text-blue-700 bg-blue-100")} />
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