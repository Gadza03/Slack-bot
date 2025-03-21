require("dotenv").config();
const { App } = require("@slack/bolt");
const { getItems } = require("./sheetApi.js");
const { findItem, formatResults } = require("./utils.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

app.message(async ({ message, say }) => {
  if (!message.text) return;

  const items = await getItems();
  const userMessage = message.text.toLowerCase();

  const results = findItem(items, userMessage);

  const response = formatResults(results, userMessage);

  await say(response);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("🚀 Slack bot is running!");
})();
