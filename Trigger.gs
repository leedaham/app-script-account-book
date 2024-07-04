//Trigger script
var ssId = getSsId();
var ss = SpreadsheetApp.openById(ssId);
var repeatSheetName = 'repeat';
var repeatSheet = ss.getSheetByName(repeatSheetName);

function checkAndSubmitRepeatData() {  
  // 데이터 범위 가져오기
  var range = repeatSheet.getDataRange();
  var values = range.getValues();
  
  // 오늘 날짜의 일(day) 가져오기
  var today = new Date();
  var todayDay = today.getDate();
  
  // 오늘 날짜와 시간을 문자열로 변환
  var scriptTimeZone = Session.getScriptTimeZone();
  var todayDateTime = Utilities.formatDate(today, scriptTimeZone, 'yyyy-MM-dd');
  var todayDateTimeStr = Utilities.formatDate(today, scriptTimeZone, 'yyyy-MM-dd HH:mm');

  // 결과를 저장할 배열
  var result = [];
  
  var dayColumn = 0;       // A열, 기준일
  var startDateColumn = 2; // C열, 시작일
  var endDateColumn = 3;   // D열, 종료일
  // 헤더를 제외한 데이터 행 순회
  for (var i = 1; i < values.length; i++) {
    var day = values[i][dayColumn]; // 기준일
    var startDate = values[i][startDateColumn]; // 시작일
    var endDate = values[i][endDateColumn]; // 종료일
    
    // 시작일과 종료일을 Date 객체로 변환
    var startDateObj = new Date(startDate);
    var endDateObj = new Date(endDate);
    var isValidDay = (startDateObj <= today && today <= endDateObj);
    // 오늘의 날짜와 일치하고 상태 값이 TRUE인지 확인

    if (day == todayDay && isValidDay === true) {
      // B열과 E-L열 데이터 추가
      var row = [];
      row.push(values[i][1]); // B열
      for (var j = 4; j <= 11; j++) {
        row.push(values[i][j]); // E-L열
      }
      result.push(row);
    }
  }
      
  // 결과 배열의 첫 번째와 마지막 데이터에 오늘 날짜 추가
  if (result.length > 0) {
    Logger.log('repeat data:');
    Logger.log(result);

    for (var k = 0; k < result.length; k++) {
      var data = {
        date: todayDateTime,
        name: result[k][0] + '(반복)', // B열
        transactionType: result[k][1], // E열
        wallet: result[k][2], // F열
        category: result[k][3], // G열
        money: result[k][4], // H열
        discountType: (result[k][5] ? result[k][5] : '-' ), // I열
        discountAmount: (result[k][6] ? result[k][6] : '-' ), // J열
        thanksTo: (result[k][7] ? result[k][7] : '-' ), // K열
        memo: (result[k][8] ? result[k][8] : '-' ), // L열
        insertDateTime: todayDateTimeStr // 추가된 오늘 날짜
      };
      submitData(data);
    }

  } else {
    Logger.log('no repeat data.');
  }
  
}