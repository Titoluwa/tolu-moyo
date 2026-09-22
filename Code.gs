/**
 * Code.gs
 * Google Apps Script Web App that receives RSVP submissions from index.html
 * and appends them to the first empty row of a Google Sheet.
 *
 * SETUP:
 * 1. Create a Google Sheet. Add a header row in this exact order on row 1:
 *    Timestamp | Full Name | WhatsApp | Email | Attending | Plus Ones |
 *    Plus One Names | Meal Choice | Song Request | Well Wishes
 * 2. Extensions > Apps Script, paste this file in as Code.gs.
 * 3. Deploy (see deployment steps provided separately).
 * 4. Copy the Web App URL into GOOGLE_SCRIPT_URL in index.html.
 */

var SHEET_NAME = "RSVPs"; // change to match your sheet/tab name

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp", "Full Name", "WhatsApp", "Email", "Attending",
        "Plus Ones", "Plus One Names", "Meal Choice", "Song Request", "Well Wishes"
      ]);
    }

    var data = parseRequestData(e);

    var plusOneNames = [data.plusOneName1, data.plusOneName2]
      .filter(function (n) { return n && n.length > 0; })
      .join(", ");

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || "",
      data.whatsapp || "",
      data.email || "",
      data.attending || "",
      data.plusOnes || "0",
      plusOneNames,
      data.meal || "",
      data.songRequest || "",
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function parseRequestData(e) {
  // Handles the JSON string sent via fetch() with mode: 'no-cors'
  // (arrives as e.postData.contents, content type text/plain).
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // Fall back to form-encoded parameters if JSON parsing fails.
    }
  }
  return e && e.parameter ? e.parameter : {};
}

// Optional: lets you open the deployed URL directly in a browser to confirm it's live.
function doGet(e) {
  return ContentService.createTextOutput("RSVP endpoint is live.");
}
