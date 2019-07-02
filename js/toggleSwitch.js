document.getElementById("myCheck").addEventListener("click", handleClick);

function handleClick() {
    //get the checkbox
    var checkBox = document.getElementById("myCheck");

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