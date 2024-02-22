import * as cheerio from "cheerio";
import axios from "axios";

export async function GET(req: Request, res: Response) {
  const url = new URL(req.url).pathname.split("/");
  const book = url[5];
  const chapter = url[6];
  let ver = "tb";

  const xml = (await axios.get(
    `https://alkitab.sabda.org/api/passage.php?passage=${book}+${chapter}&ver=${ver}`
  )) as any;
  const $ = cheerio.load(xml.data, { xmlMode: true });

  let verses = [] as any;
  $("verse").each((_, e) => {
    if ($(e).find("title").text()) {
      verses.push({
        verse: 0,
        type: "title",
        content: $(e).find("title").text(),
      });
    }
    verses.push({
      verse: parseInt($(e).find("number").text()),
      type: "content",
      content: $(e).find("text").text(),
    });
  });
  return Response.json({
    book: {
      no: parseInt($("book_id").text()),
      name: $("book").attr("name"),
      chapter: parseInt(chapter),
    },
    verses: verses,
  });
}
