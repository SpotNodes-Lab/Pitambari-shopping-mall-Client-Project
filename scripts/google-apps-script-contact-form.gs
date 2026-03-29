/**
 * Contact form → rows in a Google Sheet (used with VITE_CONTACT_FORM_URL on the storefront).
 *
 * Tie the script to YOUR spreadsheet using its link:
 *   https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
 * Copy only the SPREADSHEET_ID part into the constant below.
 *
 * Deploy: Extensions → Apps Script (standalone project is fine), paste this file, set SPREADSHEET_ID,
 * then Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone (or your org).
 * Use the Web App URL (ends in /exec) in VITE_CONTACT_FORM_URL — not the spreadsheet URL.
 *
 * The account that deploys must have edit access to the spreadsheet.
 */

var SPREADSHEET_ID = '1CvoM6DZNquqhUBLBrnEkrN_Toc7j5zUUSw2khONemZ0';
var SHEET_NAME = 'Sheet1';

function parseIncoming_(e) {
  if (e && e.postData && e.postData.contents) {
    var type = String(e.postData.type || '').toLowerCase();
    if (type.indexOf('application/json') !== -1) {
      try {
        return JSON.parse(e.postData.contents);
      } catch (ignore) {}
    }
  }
  return (e && e.parameter) ? e.parameter : {};
}

/** Opens the workbook from the ID in your sheets link (between /d/ and /edit). */
function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
}

function doPost(e) {
  try {
    var sheet = getTargetSheet_();
    var data = parseIncoming_(e);
    var name = data.name || '';
    var email = data.email || '';
    var phone = data.phone || '';
    var message = data.message || '';
    sheet.appendRow([name, email, phone, message, new Date()]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: String(err && err.message ? err.message : err),
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('OK');
}

/**
 * Optional: run once from the Apps Script editor after pasting your full browser URL.
 * Check Executions log for the extracted ID, then set SPREADSHEET_ID and delete/stop using this.
 */
function debugExtractIdFromSheetLink() {
  var url = 'PASTE_FULL_SHEET_URL_HERE';
  var m = String(url).match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  Logger.log(m ? m[1] : 'No ID found');
}
