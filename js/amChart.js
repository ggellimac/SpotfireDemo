// Create chart instance
var chart = am4core.create("am-chart", am4charts.PieChart);


//var container = am4core.create("am-chart", am4core.Container);
chart.width = am4core.percent(100);
chart.height = am4core.percent(100);
chart.background.fill = am4core.color("#293b56");
chart.background.fillOpacity = 2;
chart.background.stroke = am4core.color("#293b56");
chart.background.strokeOpacity = 2;
chart.background.strokeWidth = 2;

//gradient
var fillModifier = new am4core.LinearGradientModifier();
fillModifier.brightnesses = [-0.8, 1, -0.8];
fillModifier.offsets = [0, 0.5, 1];
fillModifier.gradient.rotation = 45;
chart.fillModifier = fillModifier;


//chart.parent = container;

// Add data
chart.data = [{
  "country": "Lithuania",
  "litres": 501.9
}, {
  "country": "Czech Republic",
  "litres": 301.9
}, {
  "country": "Ireland",
  "litres": 201.1
}, {
  "country": "Germany",
  "litres": 165.8
}, {
  "country": "Australia",
  "litres": 139.9
}, {
  "country": "Austria",
  "litres": 128.3
}, {
  "country": "UK",
  "litres": 99
}, {
  "country": "Belgium",
  "litres": 60
}, {
  "country": "The Netherlands",
  "litres": 50
}];

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";
