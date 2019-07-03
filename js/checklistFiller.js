//this is for if you want to grab "all" or "mine"
let allRiskMessages = ["This is a risk", "This is an issue", "This is my risk"];
let myRiskMessages = ["This is my risk"];

let allTaskMessages = ["This is a task", "This is a new task", "This is my task"];
let myTaskMessages = ["This is my task"];

let allActivityMessages = ["This is an activity", "This is my activity", "This is a different activity"];
let myActivityMessage = ["This is my activity"];

injectDomElement(allContent, allRiskMessages);
injectDomElement(myContent, myRiskMessages);
injectDomElement(allTasks, allTaskMessages);
injectDomElement(myTasks, myTaskMessages);
injectDomElement(allActivity, allActivityMessages);
injectDomElement(myActivity, myActivityMessage);

function injectDomElement(parent, messages) {
  messages.forEach(message => {
    let label = document.createElement("label");
    label.className = "checkbox";
    let span = document.createElement("span");
    span.className = "checkmark";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.id = "id";

    let line = document.createElement("hr");
    label.appendChild(checkbox);
    label.appendChild(span);

    label.appendChild(document.createTextNode(message));
    parent.appendChild(line);
    parent.appendChild(label);
  });
}