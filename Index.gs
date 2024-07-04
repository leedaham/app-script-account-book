//index html script
var ssId = getSsId();
var ss = SpreadsheetApp.openById(ssId);
var montlySheetName = 'montly';
var montlySheet = ss.getSheetByName(montlySheetName);
var dailySheetName = 'daily';
var dailySheet = ss.getSheetByName(dailySheetName);

var thisMonthlyReportRange = 'B5:F5';
var searchYearCell = 'E8';
var searchMonthCell = 'F8';
var searchonthlyReportRange = 'B11:F11';

function getThisMonthlyReport () {
  flush();
  var rangeData = getResources(montlySheet, thisMonthlyReportRange);

  Logger.log(rangeData);

  return rangeData;
}
function test(){
  getMonthlyReport(2024, 06);
}
function getMonthlyReport (year, month) {
  flush();
  montlySheet.getRange(searchYearCell).setValue(year);
  montlySheet.getRange(searchMonthCell).setValue(month);
  flush();
  var rangeData = getResources(montlySheet, searchonthlyReportRange);

  Logger.log(rangeData);

  return rangeData;
}
function getTodayReport(){
  flush();
  const data = getSpreadsheetData(dailySheet, 'A2:L99');
  
  getHtmlFromMap(data);
}
function getDailyReport(){
  
}