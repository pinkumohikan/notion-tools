const { Client } = require("@notionhq/client");
const { DateTime } = require('luxon');

const main = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
  });

  const baseDate = DateTime.now().setZone('Asia/Tokyo');
  const firstDay = baseDate.startOf('month');
  const finalDay = baseDate.endOf('month');

  console.log(`集計期間: ${firstDay.toFormat('yyyy-MM-dd')} ~ ${finalDay.toFormat('yyyy-MM-dd')}`)

  const r = await notion.databases.query({
    database_id: process.env.NOTION_DAYBOOK_DB_ID,
    filter: {
      and: [
        {
          property: "作成日時",
          date: {
            on_or_after: `${firstDay.toFormat("yyyy-MM-dd")}T00:00:00`
          },
        },
        {
          property: "作成日時",
          date: {
            before: `${finalDay.toFormat("yyyy-MM-dd")}T23:59:59`
          },
        },
      ],
    },
  });

  const totalWorkedMinutes = r.results
    .map((page: any) => {
      return page.properties["稼働時間"].formula.number;
    })
    .reduce((total: number, n: number) => total + n, 0);

  const workedHours = Math.floor(totalWorkedMinutes / 60);
  const workedMinutes = totalWorkedMinutes % 60;
  console.log(`今月の稼働時間 ${workedHours}:${workedMinutes}`);
};

main();
