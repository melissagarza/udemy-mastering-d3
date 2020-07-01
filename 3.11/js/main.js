/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

(async () => {

  const margin = {
    left: 100,
    right: 10,
    top: 10,
    bottom: 150
  };
  const widthSvg = 600;
  const heightSvg = 400;
  const widthChart = widthSvg - margin.left - margin.right;
  const heightChart = heightSvg - margin.top - margin.bottom;

  const dataBuildings = await d3.json('data/buildings.json');

  dataBuildings.forEach(d => { d.height = +d.height });

  const scaleX = d3.scaleBand()
    .domain(dataBuildings.map(d => d.name))
    .range([0, widthChart])
    .paddingInner(0.4)
    .paddingOuter(0.4);

  const scaleY = d3.scaleLinear()
    .domain([0, d3.max(dataBuildings, d => d.height)])
    .range([heightChart, 0]);

  const axisX = d3.axisBottom(scaleX);

  const axisY = d3.axisLeft(scaleY)
    .ticks(3)
    .tickFormat(d => `${d}m`);

  const svg = d3.select('#chart-area').append('svg')
    .attr('width', widthSvg)
    .attr('height', heightSvg);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${heightChart})`)
    .call(axisX)
    .selectAll('text')
      .attr('x', '-5')
      .attr('y', '10')
      .attr('transform', 'rotate(-40)')
      .attr('text-anchor', 'end');

  g.append('g')
    .attr('class', 'y axis')
    .call(axisY);

  g.append('text')
    .text('The World\'s Tallest Buildings')
      .attr('class', 'x axis-label')
      .attr('x', (widthChart) / 2)
      .attr('y', heightSvg - 25)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle');

  g.append('text')
    .text('Height (m)')
      .attr('class', 'y axis-label')
      .attr('x', -((heightChart) / 2))
      .attr('y', -60)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')

  const rectangles = g.selectAll('rect')
    .data(dataBuildings);

  rectangles.enter('rect')
    .append('rect')
      .attr('x', d => scaleX(d.name))
      .attr('y', d => scaleY(d.height))
      .attr('width', scaleX.bandwidth)
      .attr('height', d => heightChart - scaleY(d.height))
      .attr('fill', 'gray');

})();
