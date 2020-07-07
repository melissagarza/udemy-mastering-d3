/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

(async () => {

  const widthSvg = 1000;
  const heightSvg = 600;
  const margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100
  };
  const widthChart = widthSvg - margin.left - margin.right;
  const heightChart = heightSvg - margin.top - margin.bottom;

  const data = await d3.json('data/data.json');

  console.log(data);

  const scaleX = d3.scaleLog()
    .domain([300, 150000])
    .range([0, widthChart]);

  const scaleY = d3.scaleLinear()
    .domain([0, 100])
    .range([heightChart, 0]);

  const axisX = d3.axisBottom(scaleX)
    .tickValues([400, 4000, 40000])
    .tickFormat(d3.format(',.0f'));

  const axisY = d3.axisLeft(scaleY)
    .tickValues([0, 25, 50, 75, 100]);

  const svg = d3.select('#chart-area')
    .append('svg')
      .attr('width', widthSvg)
      .attr('height', heightSvg);

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const groupAxisX = chart.append('g')
    .attr('transform', `translate(0, ${heightChart})`)
    .call(axisX);

  const groupAxisY = chart.append('g')
    .call(axisY);

  const update = (data) => {

  };

  d3.interval(() => {
    update(data);
  }, 1000);

})();
