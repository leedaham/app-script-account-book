//Form.html script
var ssId = getSsId();
var ss = SpreadsheetApp.openById(ssId);
var dataSheetName = 'dataSheet';
var dataSheet = ss.getSheetByName(dataSheetName);
var refSheetName = 'Reference';
var refSheet = ss.getSheetByName(refSheetName);

var madeCategoriesRange = 'A2:A50';
var spentCategoriesRange = 'B2:B50';
var assetSourceRange = 'C2:C50';
var discountRange = 'D2:D50';

function submitData(data) {
  Logger.log('submitData: '+JSON.stringify(data));
  
  var appendRow = dataSheet.getLastRow()+1;
  var total = '=IF(ISNUMBER(H'+appendRow+'), F'+appendRow+' - H'+appendRow+', F'+appendRow+' - 0)';

  dataSheet.appendRow(
    [data.date, data.name, data.transactionType,
    data.wallet, data.category, data.money,
    data.discountType, data.discountAmount,
    data.thanksTo, data.memo, data.insertDateTime,
    total]
  );
}
function submitDatas(datas) {
  Logger.log('submitDatas: '+JSON.stringify(datas));
    for (var i = 0; i < datas.length; i++) {
    var appendRow = dataSheet.getLastRow()+1;
    var total = '=IF(ISNUMBER(H'+appendRow+'), F'+appendRow+' - H'+appendRow+', F'+appendRow+' - 0)';

    var data = datas[i];
      dataSheet.appendRow(
        [data.date, data.name, data.transactionType,
        data.wallet, data.category, data.money,
        data.discountType, data.discountAmount,
        data.thanksTo, data.memo, data.insertDateTime,
        total]
      );
    } 
}

function getMadeCategories() {
  return getVerticalResources(refSheet, madeCategoriesRange);
}
function getSpentCategories() {
  return getVerticalResources(refSheet,spentCategoriesRange);
}
function getAssetSource() {
  return getVerticalResources(refSheet,assetSourceRange);
}
function getDiscount() {
  return getVerticalResources(refSheet,discountRange);
}