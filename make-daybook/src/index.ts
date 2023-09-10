const { Client } = require("@notionhq/client");

const main = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
  });

  // TODO: impl
};

main();
