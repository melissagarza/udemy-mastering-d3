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
  const colors = {
    'africa': 'yellow',
    'americas': 'green',
    'asia': 'red',
    'europe': 'blue'
  };
  const tr = d3.transition().duration(300);

  let index = 0;
  let interval;

  const data = await d3.json('data/data.json');
  const continents = _.map(_.unique(data[0].countries, c => c.continent), c => c.continent).sort();

  data.forEach(d => {
    d.year = +d.year;
  });

  const scaleX = d3.scaleLog()
    .domain([125, 150000])
    .range([0, widthChart]);

  const scaleY = d3.scaleLinear()
    .domain([0, 100])
    .range([heightChart, 0]);

  const scaleR = d3.scaleLinear()
    .range([5, 25]);

  const scaleColor = d3.scaleOrdinal()
    .domain(continents)
    .range([
      'yellow',
      'green',
      'red',
      'blue'
    ]);

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

  const tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(d => {
      let text = `<strong>Country:</strong> <span style="color:red">${d.country}</span><br>`;
      text += `<strong>Continent:</strong> <span style="color:red;text-transform:capitalize">${d.continent}</span><br>`;
      text += `<strong>Life Expectancy:</strong> <span style="color:red">${d3.format('.2f')(d.life_exp)}</span><br>`;
      text += `<strong>GDP Per Capita:</strong> <span style="color:red">${d3.format('$,.0f')(d.income)}</span><br>`;
      text += `<strong>Population:</strong> <span style="color:red">${d3.format(',.0f')(d.population)}</span><br>`;
      return text;
    });

  chart.call(tip);

  const legend = chart.append('g')
    .attr('transform', `translate(${widthChart - 10}, ${heightChart - 125})`);

  continents.forEach((continent, i) => {
    let legendRow = legend.append('g')
      .attr('transform', `translate(0, ${i * 20})`);

    legendRow.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', scaleColor(continent));

    legendRow.append('text')
      .attr('x', -10)
      .attr('y', 10)
      .attr('text-anchor', 'end')
      .style('text-transform', 'capitalize')
      .text(continent);
  });

  const groupAxisX = chart.append('g')
    .attr('transform', `translate(0, ${heightChart})`)
    .transition(tr)
    .call(axisX);

  const groupAxisY = chart.append('g')
    .transition(tr)
    .call(axisY);

  const labelX = chart.append('text')
    .text('GDP Per Capita ($)')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${widthChart / 2}, ${heightChart + (margin.bottom / 2)})`);

  const labelY = chart.append('text')
    .text('Life Expectancy (Years)')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(-${margin.left / 2}, ${heightChart / 2})rotate(-90)`);

  const labelYear = chart.append('text')
    .text('')
      .attr('font-size', '150px')
      .attr('fill', 'gray')
      .attr('fill-opacity', 0.25)
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${widthChart / 2}, ${heightChart / 2})`);

  const update = (data) => {
    const countries = data[index].countries.filter(c => c.life_exp !== null && c.income !== null);
    
    labelYear.text(data[index].year);

    scaleR.domain([
      d3.min(countries, c => Math.sqrt(c.population / Math.PI)),
      d3.max(countries, c => Math.sqrt(c.population / Math.PI))
    ]);

    const points = chart.selectAll('circle')
      .data(countries, d => d.country);

    points.exit().remove();

    points.enter()
      .append('circle')
        .attr('cx', d => scaleX(d.income))
        .attr('cy', d => scaleY(d.life_exp))
        .attr('r', d => scaleR(Math.sqrt(d.population / Math.PI)))
        .attr('fill', d => scaleColor(d.continent))
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
      .merge(points)
      .transition(tr)
        .attr('cx', d => scaleX(d.income))
        .attr('cy', d => scaleY(d.life_exp))
        .attr('r', d => scaleR(Math.sqrt(d.population / Math.PI)));
  };

  $('#play-button')
    .on('click', (e) => {
      let button = $(e.target);
      if (button.text() === 'Play') {
        button.text('Pause');
        interval = setInterval(step, 300);
      } else {
        button.text('Play');
        clearInterval(interval);
      }
    });

  const step = () => {
    index = (index < 214) ? index + 1 : 0;
    update(data)
  };

  update(data);

})();
