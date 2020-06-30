/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

const svg = d3.select('body').append('svg')
  .attr('width', 500)
  .attr('height', 400);

svg.append('line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 100)
  .attr('y2', 75)
  .attr('stroke', '#000000');

svg.append('rect')
  .attr('x', 100)
  .attr('y', 75)
  .attr('width', 100)
  .attr('height', 100)
  .attr('fill', '#ff0000');

svg.append('ellipse')
  .attr('cx', 300)
  .attr('cy', 200)
  .attr('rx', 100)
  .attr('ry', 50)
  .attr('fill', '#0000ff');
