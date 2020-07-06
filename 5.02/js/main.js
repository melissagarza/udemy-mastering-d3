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

  const dataRevenues = await d3.json('data/revenues.json');

  dataRevenues.forEach(d => {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  });
  console.log(dataRevenues);

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

  chart.append('text')
    .text('Month')
      .attr('transform', `translate(${widthChart / 2}, ${heightChart + 50})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px');

  chart.append('text')
    .text('Revenue')
      .attr('transform', `translate(-60, ${heightChart / 2})rotate(-90)`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px');

  const update = (data) => {

    scaleX.domain(dataRevenues.map(d => d.month));
    scaleY.domain([0, d3.max(dataRevenues, d => d.revenue)]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);
    
    axisGroupX.call(axisX);
    axisGroupY.call(axisY);

    // const bars = chart.selectAll('rect')
    //   .data(dataRevenues);

    // bars.enter()
    //   .append('rect')
    //     .attr('x', d => scaleX(d.month))
    //     .attr('y', d => scaleY(d.revenue))
    //     .attr('width', scaleX.bandwidth)
    //     .attr('height', d => heightChart - scaleY(d.revenue))
    //     .attr('fill', '#999999');
  };

  d3.interval(() => {
    update(dataRevenues);
  }, 1000);

  update(dataRevenues);

})();
