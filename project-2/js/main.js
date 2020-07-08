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
  const tr = d3.transition().duration(500);

  let index = 0;

  const data = await d3.json('data/data.json');

  data.forEach(d => {
    d.year = +d.year;
  });

  console.log(data);

  const scaleX = d3.scaleLog()
    .domain([300, 150000])
    .range([0, widthChart]);

  const scaleY = d3.scaleLinear()
    .domain([0, 100])
    .range([heightChart, 0]);

  const scaleR = d3.scaleLinear()
    .range([5, 25]);

  const scaleColor = d3.scaleOrdinal()
    .range(d3.schemePaired);

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
    .transition(tr)
    .call(axisX);

  const groupAxisY = chart.append('g')
    .transition(tr)
    .call(axisY);

  const update = (data) => {
    const countriesByYear = data[index].countries.filter(c => c.life_exp !== null && c.income !== null);

    console.log(countriesByYear);

    scaleR.domain([
      d3.min(countriesByYear, c => c.population),
      d3.max(countriesByYear, c => c.population)
    ]);

    scaleColor.domain(countriesByYear.filter(c => c.country));

    const points = chart.selectAll('circle')
      .data(countriesByYear, d => d.country);

    points.exit().remove();

    points.enter()
      .append('circle')
        .attr('cx', d => scaleX(d.income))
        .attr('cy', d => scaleY(d.life_exp))
        .attr('r', d => scaleR(d.population))
        .attr('fill', d => scaleColor(d.country));
  };

  d3.interval(() => {

    // update(data);

    // index++;
    // if (index === 214) index = 0;
  }, 1000);

  update(data);

})();
