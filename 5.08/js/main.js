/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

(async () => {

  const margin = {
    top: 10,
    right: 10,
    bottom: 100,
    left: 100,
  };
  const widthSvg = 800;
  const heightSvg = 500;
  const widthChart = widthSvg - margin.left - margin.right;
  const heightChart = heightSvg - margin.top - margin.bottom;

  let flag = true;

  const t = d3.transition().duration(750);

  const data = await d3.json('data/revenues.json');

  data.forEach(d => {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  });
  console.log(data);

  const scaleX = d3.scaleBand()
    .range([0, widthChart])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  const scaleY = d3.scaleLinear()
    .range([heightChart, 0]);

  const svg = d3.select('#chart-area').append('svg')
    .attr('width', widthSvg)
    .attr('height', heightSvg);

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const axisGroupX = chart.append('g')
    .attr('transform', `translate(0, ${heightChart})`);

  const axisGroupY = chart.append('g')
    .attr('transform', `translate(0, 0)`);

  const labelX = chart.append('text')
    .text('Month')
      .attr('transform', `translate(${widthChart / 2}, ${heightChart + 50})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px');

  const labelY = chart.append('text')
    .text('Revenue')
      .attr('transform', `translate(-60, ${heightChart / 2})rotate(-90)`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px');

  const update = (data) => {

    const value = flag ? 'revenue' : 'profit';

    scaleX.domain(data.map(d => d.month));
    scaleY.domain([0, d3.max(data, d => d[value])]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);
    
    axisGroupX.transition(t).call(axisX);
    axisGroupY.transition(t).call(axisY);

    // JOIN new data with old elements
    const bars = chart.selectAll('rect')
      .data(data, d => d.month);

    // EXIT old elements not present in new data
    bars.exit()
      .attr('fill', 'red')
      .transition(t)
        .attr('y', scaleY(0))
        .attr('height', 0)
        .remove();

    // ENTER new elements present in new data
    bars.enter()
      .append('rect')
        .attr('x', d => scaleX(d.month))
        .attr('y', scaleY(0))
        .attr('width', scaleX.bandwidth)
        .attr('height', 0)
        .attr('fill', '#999999')
      // AND UPDATE old elements present in new data
      .merge(bars)
      .transition(t)
        .attr('x', d => scaleX(d.month))
        .attr('y', d => scaleY(d[value]))
        .attr('width', scaleX.bandwidth)
        .attr('height', d => heightChart - scaleY(d[value]));

    const label = flag ? 'Revenue' : 'Profit';
    labelY.text(label);
  };

  d3.interval(() => {
    let newData = flag ? data : data.slice(1);

    update(newData);

    flag = !flag;
  }, 1000);

  update(data);

})();
