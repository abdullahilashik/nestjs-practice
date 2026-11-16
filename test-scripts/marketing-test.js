import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || 'EAAKYcwLZAevQBTGZAnnVccnYBqaUBKwLpyALyAgIwKLkqZCuaqgxW6RoA94zipilZCIf5otjC4u5MgDE9WeCRbUfnp6hswFu0msEJLFefqTUNxZCvZCas60YJYAfoJXKorGERGN4aG9ZC9tM09JDaRUQ9OZBoxAEZCzqFbULfWRMZBX4mEhu5GfWg7BttpvxvUqHIZC40TOE7DMB5qmnmBYC88AbVybzziH4y7Qstc8wFYsXrmdaJ7iXHN8wbaQnZBCbgf46WNRz9JZAjv8VWkpyjgTlFO4GpPnXPPjFso1NDwgZDZD';
const AD_ACCOUNT_ID = process.env.AD_ACCOUNT_ID || 'act_121678278443826';
const TOTAL_CALLS = parseInt(process.env.TOTAL_CALLS || '520', 10);
const GRAPH_VERSION = 'v20.0';

// Delay helper to stay cleanly under Development Rate Limits (60 calls / 5 mins)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runMarketingApiTest() {
  if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) {
    console.error('❌ Error: Missing META_ACCESS_TOKEN or AD_ACCOUNT_ID in .env file.');
    process.exit(1);
  }

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${AD_ACCOUNT_ID}/campaigns`;

  console.log(`🚀 Starting ${TOTAL_CALLS} Marketing API test calls via npm...`);
  console.log('--------------------------------------------------');

  let successCount = 0;
  let failCount = 0;

  for (let i = 1; i <= TOTAL_CALLS; i++) {
    try {
      const response = await axios.get(url, {
        params: {
          fields: 'id,name,status',
          access_token: ACCESS_TOKEN
        }
      });

      if (response.status === 200 && !response.data.error) {
        successCount++;
        console.log(`[${i}/${TOTAL_CALLS}] ✅ Success (200 OK)`);
      } else {
        failCount++;
        console.log(`[${i}/${TOTAL_CALLS}] ❌ Failed:`, response.data.error?.message);
      }
    } catch (error) {
      failCount++;
      const errorMsg = error.response?.data?.error?.message || error.message;
      console.log(`[${i}/${TOTAL_CALLS}] ❌ Request Error: ${errorMsg}`);
    }

    // 6-second delay between calls = ~10 calls/min (Safely below 60 calls/5-min limit)
    await sleep(10000);
  }

  console.log('\n==================================================');
  console.log(`🎉 Completed!`);
  console.log(`Total Successful Calls: ${successCount}`);
  console.log(`Total Failed Calls: ${failCount}`);
  console.log('==================================================');
  console.log('📌 Reminder: Meta Dashboard counters take 12-24 hours to sync.');
}

runMarketingApiTest();