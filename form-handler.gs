/**
* Copies from separate source ranges and pastes at first empty row on target sheet
*/
var spreadsheetID = YOURSPREADSHEETID;

function formHandler() {
  var source_spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var target_spreadsheet = SpreadsheetApp.openById(spreadsheetID);
  
  
  // Get source and target sheets - can be the same or different
  var sourcesheet = source_spreadsheet.getSheetByName("Form Inputs");
  var targetsheet = target_spreadsheet.getSheetByName("Tasks");
  
  //Get row of last form submission
  var source_last_row = sourcesheet.getLastRow();
  
  // Get the source ranges
  // TimeStamp
  var source_range1 = sourcesheet.getRange("A" + (source_last_row));
  
  //Task Name
  var source_range2 = sourcesheet.getRange("B" + (source_last_row));
  
  
  //Owner
  var source_range3 = sourcesheet.getRange("C" + (source_last_row));
  
  
  //Due Date
  var source_range4 = sourcesheet.getRange("D" + (source_last_row));
  
  //Notes
  var source_range5 = sourcesheet.getRange("E" + (source_last_row));
  
  //Reviwer
  var source_range6 = sourcesheet.getRange("F" + (source_last_row));
  
  var timestamp = source_range1.getValues();
  var taskName = source_range2.getValues();
  var owner = source_range3.getValues();
  var dueDate = source_range4.getValues();
  var notes = source_range5.getValues();
  var reviewer = source_range6.getValues();
  
  // Get the last row on the target sheet
  var last_row = targetsheet.getLastRow();
  
  // Set the target ranges on target sheet
  //Owner
  var target1 = targetsheet.getRange("A" + (last_row + 1));
  
  //Task
  var target2 = targetsheet.getRange("B" + (last_row + 1));
  
  //Due Date
  var target3 = targetsheet.getRange("C" + (last_row + 1));
  
  //Status -- set to 'Not Started'
  var target4 = targetsheet.getRange("D" + (last_row + 1));
  
  //Notes
  var target5 = targetsheet.getRange("E" + (last_row + 1));
  
  //Reviewer
  var target6 = targetsheet.getRange("F" + (last_row + 1));
  
  // Put the data from the source sheet into the target sheet, after adding a new row
  targetsheet.insertRowAfter(last_row);
  target1.setValues(owner);
  target2.setValues(taskName);
  target3.setValues(dueDate);
  target4.setValue('(1) Not Started');
  target5.setValue(notes);
  target6.setValue(reviewer);
  postNewTask(owner, taskName, dueDate, notes, reviewer);
}
