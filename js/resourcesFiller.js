let resources = document.getElementById("resources-card");

let internalTeam = ["Bob J.", "Peter G.", "Rob R."];
let sponsors = ["Daffy D.", "Bugs B.", "Super M.", "Jack E."];

let largestTeam =
  internalTeam.length >= sponsors.length
    ? internalTeam.length
    : sponsors.length;

for (index = 0; index < largestTeam; index++) {
  let row = document.createElement("div");
  let leftColumn = document.createElement("div");
  let rightColumn = document.createElement("div");
  row.className = "row";
  leftColumn.className = "col";
  rightColumn.className = "col";

  if (internalTeam[index] !== undefined) {
    let leftDotSpan = document.createElement("span");
    let leftUserSpan = document.createElement("span");

    leftDotSpan.className = "dot";
    leftUserSpan.innerHTML = internalTeam[index];

    leftColumn.appendChild(leftDotSpan);
    leftColumn.appendChild(leftUserSpan);
  }

  if (sponsors[index] !== null) {
    let rightDotSpan = document.createElement("span");
    let rightUserSpan = document.createElement("span");

    rightDotSpan.className = "dot";
    rightUserSpan.innerHTML = sponsors[index];

    rightColumn.appendChild(rightDotSpan);
    rightColumn.appendChild(rightUserSpan);
  }

  row.appendChild(leftColumn);
  row.appendChild(rightColumn);
  resources.appendChild(row);
}

let button = document.createElement("button");
button.type = "button";
button.classList.add("montserrat");
button.classList.add("float-right");
button.classList.add("btn-light");
button.innerHTML = "View All";

resources.appendChild(button);
