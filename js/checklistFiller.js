//this is for if you want to grab "all" or "mine"
let allRiskMessages = ["This is a risk", "This is an issue", "This is my risk"];
let myRiskMessages = ["This is my risk"];

let allTaskMessages = [
  "This is a task",
  "This is a new task",
  "This is my task"
];
let myTaskMessages = ["This is my task"];

let allActivityDatesMessages = [
  "May 29, 2019 08:15:23 am",
  "May 29, 2019 08:15:23 am",
  "May 29, 2019 08:15:23 am",
  "May 29, 2019 08:15:23 am"
];
let myActivityDatesMessages = [
  "May 29, 2019 08:15:23 am",
  "May 29, 2019 08:15:23 am"
];

let allActivityMessages = [
  'Jack replied to your comment on your published report "Sponsor Status Report"',
  "Data refresh from Gobalto",
  "Weekly status report exported to Excel",
  "You started following Lauren on GSK Notes and Tasks"
];
let myActivityMessage = [
  'Jack replied to your comment on your published report "Sponsor Status Report"',
  "You started following Lauren on GSK Notes and Tasks"
];

injectDomElement(allContent, allRiskMessages);
injectDomElement(myContent, myRiskMessages);
injectDomElement(allTasks, allTaskMessages);
injectDomElement(myTasks, myTaskMessages);

injectDomElement(allActivityDates, allActivityDatesMessages);
injectDomElement(myActivityDates, myActivityDatesMessages);

injectDomElement(allActivity, allActivityMessages);
injectDomElement(myActivity, myActivityMessage);

function injectDomElement(parent, messages) {
  let counter = 0;
  messages.forEach(message => {
    let label = document.createElement("span");
    let span = document.createElement("span");

    let line = document.createElement("hr");
    label.appendChild(document.createTextNode(message));
    if (counter !== 0) {
      parent.appendChild(line);
    }
    parent.appendChild(label);
    counter++;
  });
}
