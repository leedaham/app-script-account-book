//Common
var ssId = getSsId();
var ss = SpreadsheetApp.openById(ssId);

//Access
function doGet(e) {
  var path = e.pathInfo;
  var html;
  
  if(path == null || path == 'index'){
    html = HtmlService.createTemplateFromFile('index');  
  } else {
    html = HtmlService.createTemplateFromFile(path);
  }
  
  html.ssId = ssId;
  var evaluated = html.evaluate();
  evaluated.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximun-scale=1.0, user-scalable=0');
  return evaluated
}

function getHtml(e) {
  return HtmlService.createHtmlOutputFromFile(e).getContent();
}
function getResource(sheet, cell){
  var cellData = sheet.getRange(cell).getValue();    
  return cellData;
}
function getResources(sheet, range){
  var cellData = sheet.getRange(range).getValues();
  return cellData;
}
function getVerticalResources(sheet, range){
  var rangeOfValues = sheet.getRange(range);
  var values = rangeOfValues.getValues();
  var validValues = [];
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] != "") { // 빈 셀은 무시
      validValues.push(values[i][0]);
    }
  } 
  return validValues;
}
function flush(){
  SpreadsheetApp.flush();
}

function getSpreadsheetData(sheet, range) {
  // A열부터 L열까지의 데이터 가져오기 (2행부터 100행까지)
  var range = sheet.getRange(range);
  var values = range.getValues();
  
  // 데이터를 저장할 Map 객체 생성
  var dataMap = new Map();
  
  // 데이터 순회
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    
    // A열이 빈 경우 빈 행으로 간주하고 건너뛰기
    if (row[0] === '') {
      continue;
    }
    
    // Map에 행 번호를 key로, 행 데이터를 value로 저장
    dataMap.set(i + 1, row); // 행 번호는 2부터 시작하므로 i + 2
  }
  
  // 결과 출력 (디버깅 용도)
  var obj = Object.fromEntries(dataMap);
  Logger.log(obj);
  
  // Map 객체 반환 (원하는 대로 사용 가능)
  return dataMap;
}
function getHtmlFromMap(dataMap){
  var htmlArray = [];
  dataMap.forEach((row, key) => {
    var divContent = '<div>';
    for (var i = 0; i < row.length; i++) {
      Logger.log(i);
      divContent += `<span>${row[i]}</span>`;
    }
    divContent += '</div>';
    htmlArray.push(divContent);
  });
  
  // HTML 문자열로 결합
  var htmlString = htmlArray.join('');
  
  // 결과 출력 (디버깅 용도)
  Logger.log(htmlString);
  
  // HTML 문자열 반환 (원하는 대로 사용 가능)
  return htmlString;
}