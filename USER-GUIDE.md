# TaskBot Guide

TaskBot is a task management system for small teams. It is comprised of the following parts:
Slack app/bot – sends messages about new tasks and digests
- Google Sheet – provides a dashboard where tasks can be viewed and managed
- Google Form – facilitates easily adding new tasks
- Google App Script – does all the work of sending the data through to Slack

__It is recommended that you download the Google Sheet app for your mobile device if you plan on using TaskBot on mobile.__

## Basic Usage
### TaskBot Messages
TaskBot sends three kinds of messages:
- When a task has been assigned (via the Google Form)
- When a task's status has been changed to Needs Review
- Weekly digest containing a list of that user's incomplete tasks with a link to their filtered view inside the Google Sheet

The first two types get sent to #tasks while the digests get sent in Direct Messages to each user who has incomplete tasks.

### Adding/Assigning tasks
The easiest way to add tasks is via the Google Form. This also ensures that a notification is sent to the #tasks channel. Tasks can also be written straight into Google Sheet, but (currently) no notification will be sent.

### Updating Task Statuses
Task statuses can be changed from the dropdown menu in the Status column inside the Google Sheet.

### Accessing your tasks
The easiest way to get to your tasks is to use the link included in your digest message. This link takes you to a Filtered View of the Google Sheet (i.e. a view that has already been pre-filtered based on tasks have been assigned to you and tasks that you've been designated as a reviewer). The other way to access your filtered view is to go to the Google Sheet, click on the drop down next to the filter icon in the toolbar, and select your name from the list. It is a good idea to bookmark the URL to your filtered view.

## Miscellany
### Filtering on Mobile
Unfortunately, Filtered Views aren't available on mobile. Using your Filtered View URL on mobile will simply direct you to the full (unfiltered Google Sheet). The workaround, if necessary, is to simply manually filter the Tasks sheet:
1. Open the Tasks sheet in the Google Sheets app
2. Tap the three vertical dots in the upper right hand corner of the screen
3. Tap Create a filter
4. Tap the triangular icon next to the column name that you want to filter by
5. Configure your filter
6. When you're done, tap the three vertical dots and tap Remove filter

## Bugs & Feature requests
Send bug reports and feature requests to Alex Von Moll (avonmoll@gmail.com).
