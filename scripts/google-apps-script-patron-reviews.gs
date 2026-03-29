/**
 * Patron review modal → Google Sheet rows (pairs with `VITE_REVIEW_FORM_URL` on the storefront).
 *
 * Expected POST fields (application/x-www-form-urlencoded):
 *   rating, review, name, description
 *
 * Deploy as Web App; set `VITE_REVIEW_FORM_URL` to the /exec URL.
 */

var SPREADSHEET_ID = '1BjwD6lG9u_Ue0uq-u_nehnN_W6XqyH_NL1dWaaEclIs';
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

function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
}

function doPost(e) {
  try {
    var sheet = getTargetSheet_();
    var data = parseIncoming_(e);

    var rating = data.rating || '';
    var review = data.review || '';
    var name = data.name || '';
    var description = data.description || '';

    sheet.appendRow([
      rating,
      review,
      name,
      description,
      new Date()
    ]);

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
