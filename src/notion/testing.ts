import notiondb from '../config/notiondb';

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getNotionData() {
  const databaseId = notiondb.testingId;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const data = response.results[0].properties;
  return JSON.stringify(data);
}

export default {
    getNotionData,
}