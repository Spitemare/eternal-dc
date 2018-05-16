import 'd3';
import dc from 'dc';

export default class SetNumber {
  constructor(data, parent) {
    this.chart = dc.pieChart(parent);
    this.dim = data.dimension(d => d.SetNumber);
    this.titles = d3.scaleOrdinal()
      .range([
        'The Empty Throne (Set 0)',
        'The Empty Throne (Set 1)',
        'Omens of the Past (Set 2)',
        'The Dusk Road (Set 3)',
        'Jekk\'s Bounty (Set 1001)',
        'The Tale of Horus Traver (Set 1002)',
        'Dead Reckoning (Set 1003)',
        'Others'
      ])
      .domain([0, 1, 2, 3, 1001, 1002, 1003]);
      this.legend = dc.legend().legendText(d => this.titles(d.name));

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .cap(3)
      .title(d => this.titles(d.key) + ': ' + d.value)
      .label(d => '')
      .legend(this.legend)
      ;
  }
}