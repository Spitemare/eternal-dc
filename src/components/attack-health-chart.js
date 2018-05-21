import 'd3';
import dc from 'dc';
import EventBus from '../utils/event-bus';

export default class AttackHealthChart {
  constructor(data, parent) {
    this.chart = dc.scatterPlot(parent);
    this.dim = data.dimension(d => [d.Attack, d.Health]);

    let attackDim = data.dimension(d => d.Attack);
    let healthDim = data.dimension(d => d.Health);

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .symbol(d3.symbolSquare)
      .x(d3.scaleLinear().domain([attackDim.bottom(1)[0].Attack - 1, attackDim.top(1)[0].Attack + 1]))
      .xAxisLabel('Attack')
      .y(d3.scaleLinear().domain([healthDim.bottom(1)[0].Health - 1, healthDim.top(1)[0].Health + 1]))
      .yAxisLabel('Health')
      .on('filtered', () => EventBus.emit('chart.filter', {...arguments}));

    attackDim.dispose();
    healthDim.dispose();
  }
}