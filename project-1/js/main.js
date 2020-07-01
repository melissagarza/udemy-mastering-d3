/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

(async () => {

  const margin = {
    top: 10,
    right: 10,
    bottom: 150,
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

})();
