/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*/

(async () => {

  try {
    const data = await d3.csv('data/ages.csv');
    
    data.forEach(d => { d.age = +d.age });
    console.log(data);

    const svg = d3.select('body').append('svg')
      .attr('width', 400)
      .attr('height', 400);

    const circles = svg.selectAll('circle')
      .data(data);

    circles.enter()
      .append('circle')
        .attr('cx', (d, i) => (i * 50) + 25)
        .attr('cy', 25)
        .attr('r', d => d.age)
        .attr('fill', d => {
          if (d.name === 'Tony') {
            return 'blue';
          }
          return 'red';
        });
  } catch (err) {
    console.log(err);
  }

})();
