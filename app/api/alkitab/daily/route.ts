/**
 * /api/alkitab/daily
 */
export async function GET(req: Request, res: Response) {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const tahun = new Date().getFullYear();
  const bulanIni = bulan[new Date().getMonth()];
  const harike = new Date().getDate();

  const data = require(`../../../../utils/data/daily/${tahun}/ayat-alkitab/${bulanIni.toLocaleLowerCase()}.json`);
  console.log(bulanIni);
  return Response.json({
    bunyi: data[harike - 1].bunyi,
    ayat: data[harike - 1].ayat,
  });
}
