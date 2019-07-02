document.getElementById("risksAndIssuesToggle").addEventListener("click", handleClickForRisksAndIssues);
document.getElementById("tasksToggle").addEventListener("click", handleClickForTasks);

//Handles the event when the user toggles the risks and issues toggle switch
function handleClickForRisksAndIssues() {
    //get the checkbox
    var checkBox = document.getElementById("risksAndIssuesToggle");

    //this is for if you want to grab "all" or "mine"
    var x = document.getElementById("all-content");
    var y = document.getElementById("mine-content");

    //the default toggle setting is set to "all", so if they set it to "mine", show "mine-content" and hide "all-content"
    if(checkBox.checked === true){
      y.style.display = "block";
      x.style.display = "none";

      console.log(x.innerHTML)

    //else show "all-content" and hide "mine-content"
    } else {
      x.style.display = "block";
      y.style.display = "none";
    }
}

//Handles the event when the user toggles the tasks toggle switch
function handleClickForTasks() {
    //get the checkbox
    var checkBox = document.getElementById("tasksToggle");

    //this is for if you want to grab "all" or "mine"
    var x = document.getElementById("all-tasks");
    var y = document.getElementById("my-tasks");

    //the default toggle setting is set to "all", so if they set it to "mine", show "mine-content" and hide "all-content"
    if(checkBox.checked === true){
      y.style.display = "block";
      x.style.display = "none";

      console.log(x.innerHTML)

    //else show "all-content" and hide "mine-content"
    } else {
      x.style.display = "block";
      y.style.display = "none";
    }
}