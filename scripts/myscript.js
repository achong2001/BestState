// add your JavaScript/D3 to this file

  const w = 850;
  const h = 400;
  const margin = {top: 50, right: 50, bottom: 50,
      left: 50};
  const innerwidth = w - margin.left - margin.right;
  const innerheight = h - margin.top - margin.bottom;

  const svg = d3.select("div#plot")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  svg.append("rect")
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "#13274F");

  svg.append("text")
     .attr("x", w / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .style("fill", "white")
    .text("Your Graph Title");

  svg.append("text")
    .attr("x", w / 2)
    .attr("y", h - 6)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "white")
    .text("States");

  svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 + margin.left)
   .attr("x", 0 - (h / 2))
   .attr("dy", "-2em")
   .attr("text-anchor", "middle")
   .style("font-size", "16px")
   .style("fill", "white")
   .text("Y-axis Label");


  const bardata = [300, 100, 150, 220, 70, 270];

  const xScale = d3.scaleBand()
      .domain(d3.range(bardata.length))
      .range([0, innerwidth])
      .paddingInner(.1);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(bardata)])
      .range([innerheight, 0])

  const xAxis = d3.axisBottom()
      .scale(xScale);

  const yAxis = d3.axisLeft()
      .scale(yScale);

  const bars = svg.append("g")
      .attr("id", "plot")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .selectAll("rect")
      .data(bardata);

  bars.enter().append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerheight - yScale(d))
      .attr("fill", "white");

  svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .call(yAxis);


  function update(data) {
    xScale.domain(d3.range(data.length));
    yScale.domain([0, d3.max(data)]);
    const bars = svg.select("#plot")
        .selectAll("rect")
        .data(data);

    bars.enter().append("rect")
      .merge(bars)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerheight - yScale(d))
      .attr("fill", "white");

    bars.exit().remove();

    svg.select(".xAxis")
        .call(xAxis);

    svg.select(".yAxis")
        .call(yAxis);

  }

    function add() {
      var newvalue = Math.floor(Math.random()*400);
      bardata.push(newvalue);
      update(bardata);
    }

    function remove() {
      bardata.pop();
      update(bardata);
      };
