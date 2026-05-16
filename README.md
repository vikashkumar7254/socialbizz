# Socialbizz

Production-ready React and Express website for Socialbizz.in.

## Scripts

```bash
npm install
npm run lint
npm run build
npm start
```

## Environment

Create `.env` from `.env.example` and set:

```env
EMAIL_USER=socialbizz.in@gmail.com
EMAIL_PASS=your_gmail_app_password_here
CONTACT_TO_EMAIL=socialbizz.in@gmail.com
GEMINI_API_KEY=
GOOGLE_SHEETS_WEBHOOK_URL=
```

Use a Gmail App Password for `EMAIL_PASS`.

## Google Sheets lead storage

Set `GOOGLE_SHEETS_WEBHOOK_URL` to a deployed Google Apps Script web app URL. The contact endpoint will email the lead first, then post the same lead data to the sheet.

Example Apps Script:

```js
function doPost(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("Leads") || spreadsheet.insertSheet("Leads");
  const data = JSON.parse(e.postData.contents);
  const headers = ["Timestamp", "Name", "Email", "Phone", "Service", "Source", "Message", "Raw Data"];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.phone,
    data.service,
    data.source,
    data.message,
    JSON.stringify(data.raw || data),
  ]);

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```
