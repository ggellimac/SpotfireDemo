am4core.options.autoSetClassName = true;

//Creates the amChart mapchart from purely JSON config files
function loadConfigFileForAmMapChart() {
  $.getJSON("../js/amMapJSONConfig.json", function(jsonData) {
    am4core.createFromConfig(
      jsonData.mapchartdata,
      "am-mapchart",
      am4maps.MapChart
    );
  });
}

loadConfigFileForAmMapChart();


let container = am4core.create("am-barchart", am4core.Container);
container.layout = "horizontal";
container.width = am4core.percent(100);
container.height = am4core.percent(100);

container.exporting.menu = new am4core.ExportMenu();
container.exporting.menu.align = "right";
container.exporting.menu.verticalAlign = "top";

//Creates a progress bar with the desired title and data
//
//
//
function createProgressBarForFinances(title, spent, total) {
  let progressBar = container.createChild(am4charts.XYChart);
  progressBar.numberFormatter.numberFormat = "$#,###";
  progressBar.width = am4core.percent(25);
  progressBar.height = am4core.percent(100);
  progressBar.minHeight = 255;
  progressBar.maxHeight = 255;
  progressBar.background.fill = am4core.color("#293b56");
  progressBar.background.fillOpacity = 0;
  progressBar.background.stroke = am4core.color("#293b56");
  progressBar.background.strokeOpacity = 2;
  progressBar.background.strokeWidth = 2;
  progressBar.maskBullets = false;

  // Add data
  progressBar.data = [
    {
      topic: "",
      total: total,
      spent: spent,
      color: am4core.color("#657181"),
      milestone: "images/milestone.svg"
    },
    {
      topic: "",
      spent: spent,
      color: am4core.color("#FF8C55"),
      milestone: "images/milestone.svg"

    }
  ];

  // Add and configure Series
  let categoryAxis = progressBar.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "topic";
  categoryAxis.title.text = title;
  categoryAxis.title.strokeWidth = 1;
  categoryAxis.fontSize = 10;
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.grid.template.disabled = true;

  let valueAxis = progressBar.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.labels.template.disabled = true;
  valueAxis.renderer.grid.template.disabled = false;
  valueAxis.min = 0;
  valueAxis.max = total;

  // Create series
  let totalSeries = progressBar.series.push(new am4charts.ColumnSeries());
  totalSeries.dataFields.valueY = "total";
  totalSeries.dataFields.categoryX = "topic";
  totalSeries.clustered = false;
  totalSeries.name = "Total";
  //totalSeries.tooltipText = "{name}: [bold]{valueY}[/]";
  totalSeries.columns.template.propertyFields.fill = "color"; // get color from data
  totalSeries.columns.template.propertyFields.stroke = "color";
  totalSeries.columns.template.width = am4core.percent(25);

  let spentSeries = progressBar.series.push(new am4charts.ColumnSeries());
  spentSeries.dataFields.valueY = "spent";
  spentSeries.dataFields.categoryX = "topic";
  spentSeries.clustered = false;
  spentSeries.name = "Spent";
  //spentSeries.tooltipText = "{name}: [bold]{valueY}[/]";
  spentSeries.columns.template.propertyFields.fill = "color"; // get color from data
  spentSeries.columns.template.propertyFields.stroke = "color";
  spentSeries.columns.template.width = am4core.percent(25);

  let totalLabel = totalSeries.bullets.push(new am4charts.LabelBullet());
  totalLabel.label.text = formatMoney(total);
  totalLabel.label.fontSize = 20;
  totalLabel.label.truncate = false;
  totalLabel.label.hideOversized = false;
  totalLabel.label.horizontalCenter = "right";
  totalLabel.label.dx = -40;

  let spentLabel = spentSeries.bullets.push(new am4charts.LabelBullet());
  spentLabel.label.text = formatMoney(spent);
  spentLabel.label.fontSize = 20;
  spentLabel.label.truncate = false;
  spentLabel.label.hideOversized = false;
  spentLabel.label.horizontalCenter = "right";
  spentLabel.label.dx = -40;

  let milestone = totalSeries.bullets.push(new am4charts.LabelBullet());
  let milestone_img = milestone.createChild(am4core.Image);
  milestone_img.rotation = -90;
  milestone_img.dy = 23;
  milestone_img.dx = -20;
  milestone.locationY = 1;

  milestone_img.width = am4core.percent(100);
  milestone_img.propertyFields.href = "milestone";

  let circle = spentLabel.createChild(am4core.Circle);
  circle.width = 10;
  circle.height = 10;
  circle.dx = -35;
  circle.horizontalCenter = "middle";
  circle.verticalCenter = "middle";
  circle.fill = am4core.color(progressBar.data[1]["color"]);
  circle.stroke = am4core.color(progressBar.data[1]["color"]);

  let gradient = new am4core.LinearGradient();
  gradient.rotation = 90;
  if ((total / spent) <= 2) {
    gradient.addColor(am4core.color("#069bcf"));
    gradient.addColor(am4core.color("#FF8C55"));
    progressBar.data[1]["color"] = gradient;
  } else {
    gradient.addColor(am4core.color("#85726C"));
    gradient.addColor(am4core.color("#FF8C55"));
    progressBar.data[1]["color"] = gradient;
  }

  

  // Add cursor
  progressBar.cursor = new am4charts.XYCursor();
  progressBar.cursor.lineX.disabled = true;
  progressBar.cursor.lineY.disabled = true;
}

createProgressBarForFinances("MONTHLY", 63123, 1238123);
createProgressBarForFinances("SITE ACT", 420023, 880000);
createProgressBarForFinances("PATIENT ENROLL", 3458000, 4000000);
createProgressBarForFinances("OVERALL EXPENSES", 7220000, 14500000);

// Left horizontal bar charts (KPI Charts to the left of the map)
//
//
//
//
//
am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  let kpiamChart = am4core.create("am-kpichart", am4charts.XYChart);
  kpiamChart.hiddenState.properties.opacity = 0; // this creates initial fade-in

  // set up colors
  kpiamChart.colors.list = [
    // light blue, orange, dark blue
    am4core.color("#75BDD0"),
    am4core.color("#F15A2A"),
    am4core.color("#4D5B74"),
    am4core.color("#ffffff")
  ];


  // category is the stage you're in
  // value0 is the first color, value 1 second, and so on
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
    }
  ];

  // adjust whitespace
  kpiamChart.padding(30, 10, 10, 0);

  // create axis for categories
  let categoryAxis = kpiamChart.yAxes.push(new am4charts.CategoryAxis());

  // show categories above and to the right of bar charts
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.dy = -10;
  categoryAxis.renderer.dx = 50;

  // resize cell which changes column size
  categoryAxis.renderer.cellStartLocation = 0.1;
  categoryAxis.renderer.cellEndLocation = 0.3;

  // hide grid
  categoryAxis.renderer.grid.template.disabled = true;

  // create value axis for percentages
  let valueAxis = kpiamChart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.max = 100;
  valueAxis.strictMinMax = true;
  valueAxis.calculateTotals = true;
  valueAxis.renderer.minWidth = 50;

  let series = [];
  let bullets = [];
  let numSeries = 3;
  // create several (numSeries) bar charts 
  for (i = 0; i < numSeries; i++) {
    series.push(kpiamChart.series.push(new am4charts.ColumnSeries()));
    series[i].columns.template.width = am4core.percent(50);

    // hover message
    series[i].columns.template.tooltipText =
      "{name}: {valueX.totalPercent.formatNumber('#.00')}%";
    if (i == 0) {
      series[i].name = "Completed";
    } else if (i == 1) {
      series[i].name = "At Risk";
    } else if (i == 2) {
      series[i].name = "To Be Completed";
    }

    // set up data fields
    series[i].dataFields.categoryY = "category";
    series[i].dataFields.valueX = "value".concat(i);
    series[i].dataFields.valueXShow = "totalPercent";
    series[i].dataItems.template.locations.categoryY = 0.5;

    series[i].stacked = true;

    series[i].tooltip.pointerOrientation = "horizontal";

    // gradient if completed or at risk
    if (i < numSeries - 1) {
      var fillModifier = new am4core.LinearGradientModifier();
      fillModifier.opacities = [1, 1];
      fillModifier.brightnesses = [0.05, 0.8];
      fillModifier.lightnesses = [0.5, 0];
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
  categoryAxis.renderer.inside = true;
  valueAxis.renderer.labels.template.disabled = true;
  categoryAxis.position = "left";
}); // end am4core.ready()

// progress bar using gantt chart example
am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // initial setup
  var chart = am4core.create("am-progressbar", am4charts.XYChart);
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  chart.paddingRight = 30;
  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

  var colorSet = new am4core.ColorSet();

  chart.data = [
    {
      started: true,
      row: "test",
      name: "PREP",
      bullet: "images/prep.svg",
      fromDate: "2018-01-01",
      toDate: "2018-03-01",
      color: am4core.color("#38A7C8"),
      milestone: "images/milestone.svg"
    },
    {
      started: true,
      row: "test",
      name: "SITE STARTUP",
      bullet: "images/startup.svg",
      fromDate: "2018-03-01",
      toDate: "2018-05-25",
      color: am4core.color("#38A7C8"),
      milestone: "images/milestone.svg"
    },
    {
      started: true,
      row: "test",
      name: "SITE ACTIVATION",
      bullet: "images/activation.svg",
      fromDate: "2018-05-25",
      toDate: "2018-06-01",
      color: am4core.color("#38A7C8"),
      milestone: "images/milestone.svg"
    },
    {
      started: true,
      row: "test",
      name: "SITE IDENTIFICATION",
      bullet: "images/identification.svg",
      fromDate: "2018-06-01",
      toDate: "2018-06-10",
      color: am4core.color("#38A7C8"),
      milestone: "images/milestone.svg"
    },
    {
      started: false,
      row: "test",
      name: "PATIENT ENROLLMENT",
      bullet: "images/enrollment.svg",
      fromDate: "2018-06-10",
      toDate: "2018-07-29",
      color: am4core.color("#4C5A71"),
    },
    {
      started: false,
      row: "test",
      name: "PATIENT TREATMENT",
      bullet: "images/treatment.svg",
      fromDate: "2018-07-29",
      toDate: "2018-09-08",
      color: am4core.color("#4C5A71"),
    },

    {
      started: false,
      row: "test",
      name: "PATIENT FOLLOW UP",
      bullet: "images/followup.svg",
      fromDate: "2018-09-08",
      toDate: "2018-12-30",
      color: am4core.color("#4C5A71"),
    }
  ];


  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());

  // if all data have the same row, it gantt chart looks stacked
  categoryAxis.dataFields.category = "row";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.inversed = true;

  // set up date axis
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
  dateAxis.renderer.minGridDistance = 70;
  dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
  dateAxis.max = new Date(2019, 0, 1, 24, 0, 0, 0).getTime();
  dateAxis.strictMinMax = true;
  dateAxis.renderer.tooltipLocation = 0;


  var series1 = chart.series.push(new am4charts.ColumnSeries());
  series1.columns.template.width = am4core.percent(80);

  // adds the corresponding image for each stage
  var bullet = series1.bullets.push(new am4charts.LabelBullet());
  var image = bullet.createChild(am4core.Image);
  image.dy = -10;
  image.dx = am4core.percent(0);
  bullet.locationX = 1;
  image.height = am4core.percent(100);
  image.propertyFields.href = "bullet";

  // adds white marker for stages that have finished/milestone property
  var milestone = series1.bullets.push(new am4charts.LabelBullet());
  var milestone_img = milestone.createChild(am4core.Image);
  milestone_img.dy = -10;
  milestone_img.dx = -25;
  milestone.locationX = 0;
  milestone_img.height = am4core.percent(100);
  milestone_img.propertyFields.href = "milestone";

  // hover and color data
  series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX} ";
  series1.dataFields.openDateX = "fromDate";
  series1.dataFields.dateX = "toDate";
  series1.dataFields.categoryY = "row";
  series1.columns.template.propertyFields.fill = "color"; // get color from data
  series1.columns.template.propertyFields.stroke = "color";

  // hide row name
  categoryAxis.renderer.labels.template.disabled = true;

  // var fillModifier = new am4core.LinearGradientModifier();
  // fillModifier.opacities = [1, 1];
  // fillModifier.brightnesses = [.05, .8];
  // fillModifier.lightnesses = [.5, 0];
  // fillModifier.offsets = [0, 1];
  // series1.columns.template.fillModifier = fillModifier;

  // stages that have begun have a gradient
  count = 0;
  chart.data.forEach(element => {
    if (element["started"]) {
      var gradient = new am4core.LinearGradient();
      gradient.addColor(am4core.color("#88C5CF"));
      gradient.addColor(element["color"], 1, 0.99);
      element["color"] = gradient;
    }
    count++;
  });
  categoryAxis.renderer.grid.template.disabled = true;

  series1.columns.template.strokeOpacity = 1;
}); // end am4core.ready()

//Formats the given number into US currency
function formatMoney(number) {
  return "$" + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
