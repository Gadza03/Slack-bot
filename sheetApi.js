require("dotenv").config();
const { google } = require("googleapis");
const credentials = JSON.parse(process.env.CREDENTIALS);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

const SHEET_ID = "1VTlROFTuXbCJbflAnPUPoK5k_6chALK-_JC-PZuYtYU";
const RANGE = "Data!A:B";

async function getItems() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log("No data in sheet.");
      return [];
    }

    const headers = rows[0];
    const items = rows
      .slice(1)
      .map((row) =>
        Object.fromEntries(
          headers.map((header, index) => [header, row[index] || ""])
        )
      );

    return items;
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    return [];
  }
}

module.exports = { getItems };
