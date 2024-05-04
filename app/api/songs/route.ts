import cheerio from "cheerio";
export async function GET() {
  const getList = await fetch("https://alkitab.app/songs");
  const text = await getList.text();
  const $ = cheerio.load(text);
  const data = $(".content-song")
    .toArray()
    .map((element) => {
      return {
        title_full: $(element).text(),
        title: $(element).text()?.match(/^(\S+)\s(.*)/)?.slice(1)
          .map((title: string) => title.replace(/[()]/g, ""))
        ,
      };
    });
  return Response.json({
    statusCode: 200,
    body: data,
  });
}
