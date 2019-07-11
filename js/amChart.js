//Dummy data to be used to fill the map
let data = [
  {"id":"US","Country":"United States","Patient Count":100,"Out of Scope":false,"Not Started":false,"Problematic":true},
  {"id":"GL","Country":"Greenland","Patient Count":73,"Out of Scope":false,"Not Started":true,"Problematic":false},
  {"id":"SO","Country":"Somalia","Patient Count":22,"Out of Scope":false,"Not Started":true,"Problematic":false},
  {"id":"KE","Country":"Kenya","Patient Count":54,"Out of Scope":false,"Not Started":false,"Problematic":false},
  {"id":"UA","Country":"Ukraine","Patient Count":12,"Out of Scope":false,"Not Started":false,"Problematic":false},
  {"id":"ET","Country":"Ethiopia","Patient Count":87,"Out of Scope":false,"Not Started":false,"Problematic":false},
  {"id":"GB","Country":"United Kingdom","Patient Count":43,"Out of Scope":false,"Not Started":false,"Problematic":false},
  {"id":"EG","Country":"Egypt","Patient Count":65,"Out of Scope":false,"Not Started":false,"Problematic":false},
  {"id":"NE","Country":"Niger","Patient Count":88,"Out of Scope":false,"Not Started":false,"Problematic":true},
  {"id":"SA","Country":"Saudi Arabia","Patient Count":2,"Out of Scope":false,"Not Started":false,"Problematic":true},
  {"id":"OM","Country":"Oman","Patient Count":17,"Out of Scope":false,"Not Started":false,"Problematic":true},
  {"id":"ES","Country":"Spain","Patient Count":95,"Out of Scope":false,"Not Started":false,"Problematic":true}
]


function loadConfigFile() {
  $.getJSON('../js/amMapjsonData.json', function (jsonData){
    console.log(jsonData.mapchartdata);
    let chart = am4core.createFromConfig(jsonData.mapchartdata, "am-barchart", am4maps.MapChart);
    var series = chart.series.push(new am4maps.MapPolygonSeries());
    series.useGeodata = true;
    //chart.dataSource.url = "../js/jsonAmChartData.json";
  });
};

loadConfigFile();

am4core.options.autoSetClassName = true;

// Create MapChart instance from AmCharts
//
//
//
//
var map = am4core.create("am-mapchart", am4maps.MapChart);

//Set map definition
map.geodata = am4geodata_worldLow;

//Set projection
map.projection = new am4maps.projections.Miller();

//Create map polygon series
var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

//Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#12769E");
polygonTemplate.nonScalingStroke = true;
polygonTemplate.strokeOpacity = 0.2;

//i tried to do something
var fillModifier = new am4core.LinearGradientModifier();
fillModifier.brightnesses = [-0.8, 1, -0.8];
fillModifier.offsets = [0, 0.5, 1];
map.fillModifier = fillModifier;

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#293B56");

//Exclude Antarctica
polygonSeries.exclude = ["AQ"];

//Zoom control
map.zoomControl = new am4maps.ZoomControl();

/*
Data - How to import data from something like Excel??? Use a JSON maybe???
Have to manually set each country value ))):
HOWEVER you can use heat-map settings to change the colors instead of manually setting
the color for each country.

polygonSeries.data = [{
  "id": "US",
  "name": "United States",
  "value": 100,
  "fill": am4core.color("#FF671F")
}, {
  "id": "ES",
  "name": "Spain",
  "value": 50,
  "fill": am4core.color("#EB3300")
}, {
  "id": "SA",
  "name": "Saudi Arabia",
  "value": 50,
  "fill": am4core.color("#FF671F")
}, {
  "id": "OM",
  "name": "Oman",
  "value": 50,
  "fill": am4core.color("#FF671F")
}, {
  "id": "NE",
  "name": "Niger",
  "value": 50,
  "fill": am4core.color("#EB3300")
}, {
  "id": "GL",
  "name": "Greenland",
  "value": 50,
  "fill": am4core.color("#828D95")
}, {
  "id": "ET",
  "name": "Ethiopia",
  "value": 50,
  "fill": am4core.color("#BBBCBC")
}, {
  "id": "KE",
  "name": "Kenya",
  "value": 50,
  "fill": am4core.color("#BBBCBC")
}];
*/
 data.forEach(element => {
   if (element["Not Started"] == true) {
     polygonSeries.data.push({"id" : element["id"], "name": element["Country"], "value":element["Patient Count"], "fill":am4core.color("#828D95")});
   }
   if (element["Problematic"] == true) {
    polygonSeries.data.push({"id" : element["id"], "name": element["Country"], "value":element["Patient Count"], "fill":am4core.color("#FF671F")});
   }
   //this statement avoids coloring the "not started" countries and only fills the "no issues" countries
   else if ((element["Problematic"] == false) && (element["Not Started"] == false)) {
    polygonSeries.data.push({"id" : element["id"], "name": element["Country"], "value":element["Patient Count"], "fill":am4core.color("#BBBCBC")});
  }

});



// Bind "fill" property to "fill" key in data
polygonTemplate.propertyFields.fill = "fill";

// Create image series
var imageSeries = map.series.push(new am4maps.MapImageSeries());

// Create a circle image in image series template so it gets replicated to all new images
// How to dynamically change size of circle depending on data (no copies)?
var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 8;
circle.fillOpacity = 0;
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{title}";

// Set property fields
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";

// Add data for the three cities
imageSeries.data = [{
  "latitude": 48.856614,
  "longitude": 2.352222,
  "title": "Paris"
}, {
  "latitude": 40.712775,
  "longitude": -74.005973,
  "title": "New York"
}, {
  "latitude": 49.282729,
  "longitude": -123.120738,
  "title": "Vancouver"
}, {
  "latitude": 39.09973,
  "longitude": -94.57857,
  "title": "Kansas City"
}];


var fillModifier = new am4core.LinearGradientModifier();
fillModifier.brightnesses = [-1, 1, -1];
fillModifier.offsets = [0, 0.5, 1];
map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#293B56");
map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 2;
map.backgroundSeries.mapPolygons.template.polygon.fillModifier = fillModifier;



// Create XYchart instance for Patient Enrollment
//
//
//
//
//
// var chart = am4core.create("am-barchart", am4charts.XYChart);


// //var container = am4core.create("am-chart", am4core.Container);
// chart.width = am4core.percent(25);
// chart.height = am4core.percent(100);
// chart.background.fill = am4core.color("#293b56");
// chart.background.fillOpacity = 0;
// chart.background.stroke = am4core.color("#293b56");
// chart.background.strokeOpacity = 2;
// chart.background.strokeWidth = 2;
// chart.marginRight = 400;


// //chart.parent = container;

// // Add data
// chart.data = [{
//   "topic": "",
//   "total": 501,
//   "spent": 450,
// }];

// // Add and configure Series
// var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
// categoryAxis.dataFields.category = "topic";
// categoryAxis.title.text = "MONTHLY VS. ANNUAL PROFIT";
// categoryAxis.title.strokeWidth = 1;
// categoryAxis.fontSize = 10;
// //categoryAxis.fill = "#FFFFFF";
// categoryAxis.renderer.grid.template.location = 0;
// categoryAxis.renderer.minGridDistance = 20;
// categoryAxis.renderer.grid.template.disabled = true;

// var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
// valueAxis.renderer.labels.template.disabled = true;
// valueAxis.renderer.grid.template.disabled = true;


// // Create series

// var series = chart.series.push(new am4charts.ColumnSeries());
// series.dataFields.valueY = "total";
// series.dataFields.categoryX = "topic";
// series.clustered = false;
// series.name = "Total";
// series.tooltipText = "{name}: [bold]{valueY}[/]";

// var series2 = chart.series.push(new am4charts.ColumnSeries());
// series2.dataFields.valueY = "spent";
// series2.dataFields.categoryX = "topic";
// series2.clustered = false;
// series2.name = "Spent";
// series2.tooltipText = "{name}: [bold]{valueY}[/]";


// // Add cursor
// chart.cursor = new am4charts.XYCursor();
// chart.cursor.lineX.disabled = true;
// chart.cursor.lineY.disabled = true;





// Left horizontal bar charts (KPI Charts to the left of the map)
//
//
//
//
//
am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var kpiamChart = am4core.create("am-kpichart", am4charts.XYChart);
  kpiamChart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  kpiamChart.colors.list = [
    // light blue, orange, dark blue
    am4core.color("#75BDD0"),
    am4core.color("#F15A2A"),
    am4core.color("#4D5B74"),
    am4core.color("#ffffff")

  ];

  kpiamChart.data = [
    {
      category: "PATIENTS ENROLLED",
      value0: 14,
      // value2: 5,
      value2: 200 - 14
    },
    {
      category: "SITES ACTIVATED",
      value0: 48,
      // value2: 0,
      value2: 200 - 48
    },
    {
      category: "SITES IDENTIFIED",
      value0: 68,
      value1: 40,
      value2: 200 - 68 - 40
    },

  ];

  // chart.colors.step = 2;
  kpiamChart.padding(30, 10, 10, 0);
  // kpiamChart.legend = new am4charts.Legend();


  var categoryAxis = kpiamChart.yAxes.push(new am4charts.CategoryAxis());

  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.dy = -10;
  categoryAxis.renderer.dx = 50;
  categoryAxis.renderer.grid.template.location = 0;

  // resize cell which changes column size
  categoryAxis.renderer.cellStartLocation = 0.1;
  categoryAxis.renderer.cellEndLocation = 0.3;

  // remove grid
  categoryAxis.renderer.grid.template.disabled = true;

  var valueAxis = kpiamChart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.max = 100;
  valueAxis.strictMinMax = true;
  valueAxis.calculateTotals = true;
  valueAxis.renderer.minWidth = 50;

  var series = [];
  var bullets = [];
  var numSeries = 3;
  for (i = 0; i < numSeries; i++) {
    series.push(kpiamChart.series.push(new am4charts.ColumnSeries()));
    series[i].columns.template.width = am4core.percent(50);

    series[i].columns.template.tooltipText =
      "{name}: {valueX.totalPercent.formatNumber('#.00')}%";
    // series[i].name = "Series ".concat(i);
    if (i == 0) {
      series[i].name = "Completed";
    } else if (i == 1) {
      series[i].name = "At Risk";
    } else if (i == 2) {
      series[i].name = "To Be Completed";
    }

    series[i].dataFields.categoryY = "category";
    series[i].dataFields.valueX = "value".concat(i);
    series[i].dataFields.valueXShow = "totalPercent";
    series[i].dataItems.template.locations.categoryY = 0.5;

    series[i].stacked = true;
    series[i].tooltip.pointerOrientation = "horizontal";

    if (i < numSeries - 1) {
      var fillModifier = new am4core.LinearGradientModifier();
      fillModifier.opacities = [1, 1];
      fillModifier.brightnesses = [.05, .8];
      fillModifier.lightnesses = [.5, 0];
      fillModifier.offsets = [0, 1];
      series[i].columns.template.fillModifier = fillModifier;
    }

    series[i].columns.template.strokeWidth = 0;
    bullets[i] = series[i].bullets.push(new am4charts.LabelBullet());
    bullets[i].interactionsEnabled = false;
    bullets[i].label.text = "{valueX.totalPercent.formatNumber('#.00')}%";
    bullets[i].label.fill = am4core.color("#ffffff");

    bullets[i].locationX = 0.5;


  }
  // categoryAxis.renderer.disabled = true;
  categoryAxis.renderer.inside = true;

  valueAxis.renderer.labels.template.disabled = true;
  categoryAxis.position = "left";
  // kpiamChart.scrollbarY = new am4core.Scrollbar();

}); // end am4core.ready()
