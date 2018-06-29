import 'd3';
import dc from 'dc';

export default class FactionChart {
  constructor(data, parent) {
    this.chart = dc.pieChart(parent);
    this.dim = data.dimension(d => d.Factions, true);
    this.titles = d3.scaleOrdinal()
      .range([
        'Justice',
        'Primal',
        'Shadow',
        'Fire',
        'Time',
        'Factionless'
      ])
      .domain(['J', 'P', 'S', 'F', 'T', 'Z']);
    this.legend = dc.legend().legendText(d => this.titles(d.name));

    this.legendOrdering = d3.scaleOrdinal()
      .range(d3.range(this.titles.domain().length))
      .domain(this.titles.domain());

    this.colors = d3.scaleOrdinal()
      .range(['#2ca02c', '#1f77b4', '#9467bd', '#d62728', '#ff7f0e', '#7f7f7f'])
      .domain(this.titles.domain());

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .title(d => this.titles(d.key) + ': ' + d.value)
      .label(d => '')
      .legend(this.legend)
      .colors(this.colors)
      .ordering(d => this.legendOrdering(d.key));

    dc.override(this.chart, 'legendables', () => this.chart._legendables().sort((a, b) => this.legendOrdering(a.name) - this.legendOrdering(b.name)));
  }
}