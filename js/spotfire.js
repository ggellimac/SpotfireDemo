var app;
var doc;
var webPlayerServerRootUrl =
  "https://spotfire-next.cloud.tibco.com/spotfire/wp/";
var analysisPath = "/Teams/01DECXJ2T13ZJ745WSCZ0S2YAA/ganttchart V7.5";
var parameters = "";
var reloadInstances = true;
var apiVersion = "10.4";

var customizationInfo = {
  showAbout: false,
  showAnalysisInformationTool: false,
  showAuthor: false,
  showClose: false,
  showCustomizableHeader: false,
  showDodPanel: false,
  showExportFile: false,
  showFilterPanel: false,
  showHelp: false,
  showLogout: false,
  showPageNavigation: false,
  showStatusBar: false,
  showToolBar: false,
  showUndoRedo: false
};

/*
ok looks like i can't even add anything here or else the API just doesn't work,
so I'm gonna comment this all out.
var d3Info = {
  d3.select("mapChart").style("background-color", "black");
};

var color = d3.scale.linear()
    .range(["steelblue", "brown"])
    .interpolate(d3.interpolateHcl);
*/

spotfire.webPlayer.createApplication(
  webPlayerServerRootUrl,
  customizationInfo,
  analysisPath,
  parameters,
  reloadInstances,
  apiVersion,
  onReadyCallback,
  onCreateLoginElement
  /* d3Info */
);
function onReadyCallback(response, newApp) {
  app = newApp;
  if (response.status === "OK") {
    // The application is ready, meaning that the api is loaded and that
    // the analysis path is validated for the current session
    // (anonymous or logged in user)
    console.log(
      "OK received. Opening document to page 0 in element renderAnalysis"
    );

    //The mock map data visualization for site activation
    mapChart = app.openDocument("map-chart", 1, customizationInfo);

    //The mock pie chart visualization for sites activated VS. sites not activated
    siteAct = app.openDocument("budget-chart", 4, customizationInfo);

    kpiChart = app.openDocument("kpiChart", 3,customizationInfo);
  } else {
    console.log("Status not OK. " + response.status + ": " + response.message);
  }
}

function onError(error) {
  console.log("Error: " + error);
}

function onCreateLoginElement() {
  console.log("Creating the login element");

  // Optionally create and return a div to host the login button
  return null;
}
