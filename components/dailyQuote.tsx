export default async function DailyQuote() {
    let data = await fetch("https://alkitab-ecru.vercel.app/api/alkitab/daily", {
        cache: "no-store",
    });
    let ayatquote = await data.json();
    return (
        <div className="z-[200] max-w-4xl border-l-4 rounded-md py-5 md:py-10 bg-white/5 backdrop-blur-md px-5 md:px-10">
            <h2 className="text-xl md:text-3xl text-gray-300 mb-10">{ayatquote.bunyi}</h2>
            <p className="text-md md:text-2xl text-right text-gray-400">{ayatquote.ayat}</p>
        </div>
    )
}