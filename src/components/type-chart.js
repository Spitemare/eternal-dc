import 'd3';
import dc from 'dc';
import EventBus from '../utils/event-bus';

export default class TypeChart {
  constructor(data, parent) {
    this.chart = dc.pieChart(parent);
    this.dim = data.dimension(d => d.Type);
    this.legend = dc.legend().legendText(dc.pluck('name'));

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .title(d => d.key + ': ' + d.value)
      .label(d => '')
      .legend(this.legend)
      .on('filtered', () => EventBus.emit('chart.filter', {...arguments}));

    dc.override(this.chart, 'legendables', () => this.chart._legendables().sort((a, b) => {
      return a.name.localeCompare(b.name);
    }));
  }
}