import dc from 'dc';
import EventBus from '../utils/event-bus';

export default class CostChart {
  constructor(data, parent) {
    this.chart = dc.rowChart(parent);
    this.dim = data.dimension(d => d.Cost);

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .cap(7)
      .othersLabel('7+')
      .ordering(dc.pluck('key'))
      .elasticX(true)
      .on('filtered', () => EventBus.emit('chart.filter', {...arguments}));
  }
}