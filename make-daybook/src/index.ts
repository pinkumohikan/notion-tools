import {Dayjs} from "dayjs";

const { Client } = require("@notionhq/client");
const dayjs = require("dayjs");

type Daybook = {
  url: string;
}

const main = async () => {
  const now = dayjs();
  const daybookDbId: string|undefined = process.env.NOTION_DAYBOOK_DB_ID;
  if (daybookDbId === undefined) {
    throw new Error('Env var NOTION_DAYBOOK_DB_ID is not defined.');
  }
  const notionApiToken: string|undefined = process.env.NOTION_API_TOKEN;
  if (notionApiToken === undefined) {
    throw new Error('Env var NOTION_API_TOKEN is not defined.');
  }
  const notionApi = new Client({auth: notionApiToken});

  let daybook: Daybook|undefined;
  try {
    daybook = await createDaybook(now, notionApi, daybookDbId);
  } catch (e) {
    console.error('failed to create daybook.', e);
  }

  console.log(daybook!.url);
};

const createDaybook = async (now: Dayjs, notionApi: typeof Client, daybookDbId: string): Promise<Daybook> => {
  // see: https://developers.notion.com/reference/post-page
  // see: https://developers.notion.com/reference/page-property-values
  return await notionApi.pages.create({
    parent: {database_id: daybookDbId},
    properties: {
      title: {
        title: [
          {
            text: {
              content: now.format('YYYY/MM/DD')
            }
          }
        ]
      },
      '稼働開始': {
        type: 'date',
        date: {
          start: now.format('YYYY-MM-DD 10:00'),
          time_zone: 'Asia/Tokyo'
        }
      },
      '稼働終了': {
        type: 'date',
        date: {
          start: now.format('YYYY-MM-DD 19:00'),
          time_zone: 'Asia/Tokyo'
        }
      },
      '休憩時間': {
        number: 60,
      },
    }
  });
}

main();
