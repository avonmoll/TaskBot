var spreadsheetID = YOURSPREADSHEETID;
var spreadsheet = SpreadsheetApp.openById(spreadsheetID);
var taskSheet = spreadsheet.getSheetByName("Tasks");
var peopleSheet = spreadsheet.getSheetByName("People");
//var lastRow = taskSheet.getLastRow();;

function onEdit(e) {
  // determine if the status column was edited to be "Needs Review"
  var editedColumn = e.range.getA1Notation()[0];
  var statusColumn = spreadsheet.getRangeByName('Status').getA1Notation()[0];
  var needsReview = editedColumn == statusColumn && e.range.getValue().indexOf('Review') > -1;
  if (needsReview) {
    Logger.log(e.range.getDataSourceUrl());
    // get row associated with this task
    var editedRow = e.range.getA1Notation().slice(1);
    var task = spreadsheet.getRangeByName("Task").getValues()[editedRow - 1];
    var notes = spreadsheet.getRangeByName("Notes").getValues()[editedRow - 1];
    var reviewer = spreadsheet.getRangeByName("Reviewer").getValues()[editedRow - 1];
  }
  SortTable();
  if (needsReview)
    postNeedsReview(task, notes, reviewer);
}

function onFormSubmit(e) {
  formHandler();
  SortTable();
}

function SortTable() {
  //  var ss = SpreadsheetApp.getActiveSpreadsheet();
  //  var sheet = ss.getSheetByName("Tasks");         
  var columnToSortBy1 = spreadsheet.getRangeByName("DueDate").getA1Notation().charCodeAt(0) - 64; //3; // Due Date     
  var columnToSortBy2 = spreadsheet.getRangeByName("Owner").getA1Notation().charCodeAt(0) - 64; //1; // Owner
  //Next row means: getRange(row, column, number of rows, number of columns)
  var table = taskSheet.getRange(2, 1, taskSheet.getLastRow() - 1, taskSheet.getLastColumn());
  table.sort( { column : columnToSortBy1, ascending: true } ); 
  table.sort( { column : columnToSortBy2, ascending: true } ); 
}

function SendDigests() {
  var dmIDs = spreadsheet.getRangeByName('SlackDMID').getValues();
  var names = spreadsheet.getRangeByName('Name').getValues();
  var viewURLs = spreadsheet.getRangeByName('ViewURL').getValues();
//  var reviewViewURLs = spreadsheet.getRangeByName('ReviewViewURL').getValues();
  for (var i = 1; i < dmIDs.length; i++) {
    if (dmIDs[i] == '') { break; }
    var userTasks = spreadsheet.getSheetByName(names[i][0] + ' Tasks').getDataRange().getValues();
    var userReviews = spreadsheet.getSheetByName(names[i][0] + ' Review').getDataRange().getValues();
    
    Logger.log(postUserDigest(names[i][0], dmIDs[i][0], userTasks, userReviews, viewURLs[i][0]));
  }
}
