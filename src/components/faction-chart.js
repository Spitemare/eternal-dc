import 'd3';
import dc from 'dc';
import EventBus from '../utils/event-bus';

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
      .domain(['{J}', '{P}', '{S}', '{F}', '{T}']);
    this.legend = dc.legend().legendText(d => this.titles(d.name));

    this.legendOrdering = d3.scaleOrdinal()
      .range(d3.range(this.titles.domain().length))
      .domain(this.titles.domain());

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .title(d => this.titles(d.key) + ': ' + d.value)
      .label(d => '')
      .legend(this.legend)
      .ordering(dc.pluck('key'))
      .on('filtered', () => EventBus.emit('chart.filter', {...arguments}));
      ;

    dc.override(this.chart, 'legendables', () => this.chart._legendables().sort((a, b) => {
      return this.legendOrdering(a.name) - this.legendOrdering(b.name);
    }));
  }
}