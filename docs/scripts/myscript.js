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
    .text("Top 1-15 Dangerous States");

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
   .text("Crime per 100,000 People");

  const bardata = [{key: "DC", value: 812.3}];
  const newdata = [{key: "New Mexico", value: 780.5},{key: "Alaska", value: 758.9}, {key: "Arkansas", value: 645.3}, {key: "Louisiana", value: 628.6},{key: "Tennessee", value: 621.6}, {key: "California", value: 499.5}, {key: "Colorado", value: 492.5},{key: "South Carolina", value: 491.3}, {key: "Missouri", value: 488}, {key: "Michigan", value: 461},{key: "Nevada", value: 454}, {key: "Texas", value: 431.9}, {key: "Arizona", value: 431.5}];

  const xScale = d3.scaleBand()
      .domain(bardata.map(d => d.key))
      .range([0, innerwidth])
      .paddingInner(.1);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(bardata, d => d.value)])
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
      .attr("height", d => innerheight - yScale(d.value))
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
    xScale.domain(data.map(d => d.key));
    yScale.domain([0, d3.max(data, d => d.value)]);
    const bars = svg.select("#plot")
        .selectAll("rect")
        .data(data);

    const barText = svg.select("#plot")
    .selectAll("text")
    .data(data);


    bars.enter().append("rect")
      .merge(bars)
      .attr("x", d => xScale(d.key))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerheight - yScale(d.value))
      .attr("fill", "white");

    barText.enter().append("text")
    .merge(barText)
    .text(d => d.value)
    .attr("x", d => xScale(d.key) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.value) - 5)
    .attr("text-anchor", "middle")
    .style("fill", "#fff")
    .style("font-size", "12px");

    bars.exit().remove();

    barText.exit().remove();

    svg.select(".xAxis")
        .call(xAxis);

    svg.select(".yAxis")
        .call(yAxis);

  }

    function add() {
      if (newdata.length > 0) {
        var newvalue = newdata.shift();
        bardata.push(newvalue);
        update(bardata);
      }
    }

    function remove() {
      if (bardata.length > 1) {
        var oldvalue = bardata.pop();
        newdata.unshift(oldvalue);
        update(bardata);
       }
      };
