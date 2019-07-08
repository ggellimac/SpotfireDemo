var color = d3.scale.linear()
    .range(["steelblue", "brown"])
    .interpolate(d3.interpolateHcl);


d3.select("mapChart").style("background-color", "black");
