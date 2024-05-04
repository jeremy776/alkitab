import cheerio from "cheerio";

export async function GET(req: Request, res: Response) {
  const params = new URL(req.url).pathname.split("/");
  const param = params[3];

  const getList = await fetch("https://alkitab.app/"+param.toUpperCase());
  const text = await getList.text();
  const $ = cheerio.load(text);
  const data = $('.judul-lagu-kolom')
    .toArray()
    .map((element, index) => {
      // remove element small 
      $(element).find('small').remove();
      return {
        no: index+1,
        judul: $(element).text()
        // remove space and new line
        .replace(/\s+/g, ' ')
        .trim()
        // and remove first character which is a number
        .replace(/^\d+\s/, '')
      };
    });

  return Response.json({
    statusCode: 200,
    body: data
  });
}