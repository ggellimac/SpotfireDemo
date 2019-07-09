// Create MapChart instance
var map = am4core.create("chartdiv", am4maps.MapChart);

//Set map definition
map.geodata = am4geodata_worldLow;

//Set projection
map.projection = new am4maps.projections.Miller();

//Create map polygon series
var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

//Exclude Antarctica
polygonSeries.exclude = ["AQ"];






// Create XYchart instance
var chart = am4core.create("am-chart", am4charts.XYChart);
polygonSeries.useGeodata = true;

//var container = am4core.create("am-chart", am4core.Container);
chart.width = am4core.percent(100);
chart.height = am4core.percent(100);
chart.background.fill = am4core.color("#293b56");
chart.background.fillOpacity = 0;
chart.background.stroke = am4core.color("#293b56");
chart.background.strokeOpacity = 2;
chart.background.strokeWidth = 2;
chart.marginRight = 400;


//chart.parent = container;

// Add data
chart.data = [{
  "country": "Lithuania",
  "research": 501.9,
  "marketing": 250,
  "sales": 199
}, {
  "country": "Czech Republic",
  "research": 301.9,
  "marketing": 222,
  "sales": 251
}, {
  "country": "Ireland",
  "research": 201.1,
  "marketing": 170,
  "sales": 199
}, {
  "country": "Germany",
  "research": 165.8,
  "marketing": 122,
  "sales": 90
}, {
  "country": "Australia",
  "research": 139.9,
  "marketing": 99,
  "sales": 252
}, {
  "country": "Austria",
  "research": 128.3,
  "marketing": 85,
  "sales": 84
}, {
  "country": "UK",
  "research": 99,
  "marketing": 93,
  "sales": 142
}, {
  "country": "Belgium",
  "research": 60,
  "marketing": 50,
  "sales": 55
}, {
  "country": "The Netherlands",
  "research": 50,
  "marketing": 42,
  "sales": 25
}];

// Add and configure Series
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.title.text = "Local country offices";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 20;


var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Expenditure (M)";

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "research";
series.dataFields.categoryX = "country";
series.name = "Research";
series.tooltipText = "{name}: [bold]{valueY}[/]";
series.stacked = true;

var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.dataFields.valueY = "marketing";
series2.dataFields.categoryX = "country";
series2.name = "Marketing";
series2.tooltipText = "{name}: [bold]{valueY}[/]";
series2.stacked = true;

var series3 = chart.series.push(new am4charts.ColumnSeries());
series3.dataFields.valueY = "sales";
series3.dataFields.categoryX = "country";
series3.name = "Sales";
series3.tooltipText = "{name}: [bold]{valueY}[/]";
series3.stacked = true;

// Add cursor
chart.cursor = new am4charts.XYCursor();





// Left horizontal bar charts

am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var kpiamChart = am4core.create("kpiamChart", am4charts.XYChart);
  kpiamChart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  kpiamChart.colors.list = [
    // light blue, orange, dark blue
    am4core.color("#75BDD0"),
    am4core.color("#F15A2A"),
    am4core.color("#4D5B74")
  ];



  let gradient = new am4core.LinearGradient();
  gradient.addColor(am4core.color("white"));
  gradient.addColor(am4core.color("blue"));


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
  kpiamChart.legend = new am4charts.Legend();


  var categoryAxis = kpiamChart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";

  categoryAxis.renderer.grid.template.location = 0;

  // resize cell which changes column size
  categoryAxis.renderer.cellStartLocation = 0.1;
  categoryAxis.renderer.cellEndLocation = 0.5;

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


    bullets[i] = series[i].bullets.push(new am4charts.LabelBullet());
    bullets[i].interactionsEnabled = false;
    bullets[i].label.text = "{valueX.totalPercent.formatNumber('#.00')}%";
    bullets[i].label.fill = am4core.color("#ffffff");

    bullets[i].locationX = 0.5;

  }
  // kpiamChart.scrollbarY = new am4core.Scrollbar();

}); // end am4core.ready()





