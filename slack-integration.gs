var spreadsheetURL = YOURSPREADSHEETURL;
var spreadsheetID = YOURSPREADSHEETID;
var inWebhook = 'https://hooks.slack.com/services/YOURWEBHOOKURL';
var chatPostURL = 'https://slack.com/api/chat.postMessage';
var channel = YOURCHANNEL;
var channelID = YOURCHANNELID;
var appToken = YOURAPPTOKEN;
var appUserID = YOURAPPUSERID;
var botToken = YOURBOTTOKEN;
var botUserID = BOTUSERID;
var teamID = YOURTEAMID;
var scope = 'identify,bot,incoming-webhook,chat:write:bot';


function findInColumn(column, data) {
  var column = spreadsheet.getRangeByName(column);
  
  var values = column.getValues(); 
  var row = 0;
  
  while ( values[row] && values[row][0] !== data ) {
    row++;
  }
  
  if (values[row] && values[row][0] === data) 
    return row;
  else 
    return -1;
}

function idFromName(name) {
  var row = findInColumn("Name", name);
  if (row != -1) {
    var range = spreadsheet.getRangeByName("SlackID");
    var values = range.getValues();
    return values[row];
  }
  else
    return '';
  
}

function postNewTask(owner, task, dueDate, notes, reviewer) {
  var ownerID = idFromName(String(owner));
  var row = findInColumn("Task", task);
  var cellString = 'A1'; // + row;
  
  var text = ":memo: <" + spreadsheetURL + "&range=" + 
    cellString + "|*" + task + 
      "*> assigned to";
  if (ownerID != '')
    text = text +  "<@" + ownerID + ">";
  else
    text = text + " _" + owner + "_:grey_question:";
  if (dueDate != '')
    text = text + "\n\n*Due Date*\n " + Utilities.formatDate(new Date('' + dueDate), "EST", "EEE MMM d");
  if (notes != '')
    text = text + "\n\n*Notes*\n " + notes;
  if (reviewer != '') {
    var reviewerID = idFromName(String(reviewer));
    text = text + "\n\n*Reviewer*\n <@" + reviewerID + ">";
  }
  var payload = {
    "channel": "#" + channel,
    "mrkdwn_in": ["text"],
    "text": text,
  };
  
  var url = inWebhook;
  var options = {
    'method': 'post',
    'payload': JSON.stringify(payload)
  };
  
  var response = UrlFetchApp.fetch(inWebhook,options);
}

function postNeedsReview(task, notes, reviewer) {
  var row = findInColumn("Task", task);
  var cellString = 'A1'// + row;
  if (reviewer != '')
    var reviewerID = '@' + idFromName(String(reviewer));
  else
    var reviewerID = '!channel';
  var text = ":eyes: <" + spreadsheetURL + "|*" + task + "*> needs review by <" + reviewerID + ">";
  if (notes != '')
    text = text + "\n\n*Notes*\n " + notes;
  var payload = {
    "channel": "#" + channel,
    "mrkdwn_in": ["text"],
    "text": text,
  };
  
  var url = inWebhook;
  var options = {
    'method': 'post',
    'payload': JSON.stringify(payload)
  };
  
  var response = UrlFetchApp.fetch(inWebhook,options);
}

function postUserDigest(user, dmID, tasks, reviews, viewURL) {
  Logger.log(dmID);
  if (tasks[0][0] == "#N/A" && reviews[0][0] == "#N/A")
    return user + ": No matches, no digest sent";
  var payload = {
    //    'token': appToken
    'token': botToken,
    'channel': dmID,
    //    'as_user': 'true',
    'username': 'TaskBot',
    'icon_url': 'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2017-10-03/252104451239_0c43f0197a3224e66d47_96.png',
    "text": "Hello, " + user + "! Here are your incomplete <" + viewURL + "|tasks and items needing review>:\n",
  };
  
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i][0] != "#N/A")
      payload.text += ':memo: ' + tasks[i][0] + '\n';
  }
  for (var i = 0; i < reviews.length; i++) {
    if (reviews[i][0] != "#N/A")
      payload.text += ':eyes: ' + reviews[i][0] + '\n';
  }
  
  var options = {
    'method': 'post',
    'payload': payload
  };
  var response = UrlFetchApp.fetch(chatPostURL, options);
  return response;
}
