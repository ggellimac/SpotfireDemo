document
  .getElementById("risksAndIssuesToggle")
  .addEventListener("click", handleClickForRisksAndIssues);
document
  .getElementById("tasksToggle")
  .addEventListener("click", handleClickForTasks);
document
  .getElementById("activityToggle")
  .addEventListener("click", handleClickForActivity);

//this is for if you want to grab "all" or "mine"
let allContent = document.getElementById("all-content");
let myContent = document.getElementById("mine-content");

let allTasks = document.getElementById("all-tasks");
let myTasks = document.getElementById("my-tasks");

let allActivity = document.getElementById("all-activity");
let myActivity = document.getElementById("my-activity");


//Handles the event when the user toggles the risks and issues toggle switch
function handleClickForRisksAndIssues() {
  //get the checkbox
  var checkBox = document.getElementById("risksAndIssuesToggle");

  //the default toggle setting is set to "all", so if they set it to "mine", show "mine-content" and hide "all-content"
  if (checkBox.checked === true) {
    myContent.style.display = "block";
    allContent.style.display = "none";

    //else show "all-content" and hide "mine-content"
  } else {
    allContent.style.display = "block";
    myContent.style.display = "none";
  }
}

//Handles the event when the user toggles the tasks toggle switch
function handleClickForTasks() {
  //get the checkbox
  var checkBox = document.getElementById("tasksToggle");

  //the default toggle setting is set to "all", so if they set it to "mine", show "my-tasks" and hide "all-tasks"
  if (checkBox.checked === true) {
    myTasks.style.display = "block";
    allTasks.style.display = "none";

    //else show "all-tasks" and hide "mine-tasks"
  } else {
    allTasks.style.display = "block";
    myTasks.style.display = "none";
  }
}

//Handles the event when the user toggles the activity toggle switch
function handleClickForActivity() {
  //get the checkbox
  var checkBox = document.getElementById("activityToggle");

  //the default toggle setting is set to "all", so if they set it to "mine", show "mine-activity" and hide "all-activity"
  if (checkBox.checked === true) {
    myActivity.style.display = "block";
    allActivity.style.display = "none";

    //else show "all-activity" and hide "mine-activity"
  } else {
    allActivity.style.display = "block";
    myActivity.style.display = "none";
  }
}
