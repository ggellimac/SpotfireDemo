function load(file){
  var src = document.createElement("script");
  src.setAttribute("type", "text/javascript");
  src.setAttribute("src", file);
  document.getElementsByTagName("head")[0].appendChild(src);

}

load("js/amChart.js");
load("js/sb-admin.js");
