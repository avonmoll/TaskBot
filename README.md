# TaskBot
An ad-hoc task management system based on Google Sheets and Slack

## [Google Sheets Template](https://docs.google.com/spreadsheets/d/e/2PACX-1vT_5mdUkMvdq1y4B9O5ODw-_YSefvgtTIgMPVCGPOAhpfBA-h_b2pMiUeWbs6g8yybiY3LrPy8aKb1A/pubhtml)
This is the bare-bones task dashboard. Create a copy of this file and save to your Google Drive.

## Installation
1. After copying the Google Sheet Template into your Google Drive, you'll have to copy and paste the Google AppScript files from this repo into the script editor via __Tools__ -> __Script Editor__
2. Install TaskBot Slack App into your Slack via this:
  <a href="https://slack.com/oauth/authorize?&client_id=104514560359.242266297828&scope=incoming-webhook,bot,chat:write:bot"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
3. Replace all of the project specific information in the Google App Scripts with your pertinent information (e.g. tokens, URLs, etc.)
4. Fill in information for all of the people in the `People` sheet
5. Add tasks
