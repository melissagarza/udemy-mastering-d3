/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

(async () => {

  const dataBuildings = await d3.json('data/buildings.json');

  dataBuildings.forEach(d => { d.height = +d.height });
  console.log(dataBuildings);

  const x = d3.scaleBand()
    .domain(dataBuildings.map(d => d.name))
    .range([0, 400])
    .paddingInner(0.4)
    .paddingOuter(0.4);

  const y = d3.scaleLinear()
    .domain([0, d3.max(dataBuildings, d => d.height)])
    .range([0, 400]);

  const svg = d3.select('#chart-area').append('svg')
    .attr('width', 500)
    .attr('height', 500);

  const rectangles = svg.selectAll('rect')
    .data(dataBuildings);

  rectangles.enter('rect')
    .append('rect')
      .attr('x', d => x(d.name))
      .attr('y', 0)
      .attr('width', x.bandwidth)
      .attr('height', d => y(d.height))
      .attr('fill', 'gray');

})();
