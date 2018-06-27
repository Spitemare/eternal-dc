import 'd3';
import dc from 'dc';
import EventBus from '../utils/event-bus';

function valueOrDefault(d, valueAccessor, def) {
  return d ? valueAccessor(d) : def;
}

function recomputeAxes() {
  let data = this.data;

  let attackDim = data.dimension(d => d.Attack);
  let healthDim = data.dimension(d => d.Health);

  let bottomAttack = attackDim.bottom(1)[0];
  let topAttack = attackDim.top(1)[0];

  bottomAttack = valueOrDefault(bottomAttack, (d) => d.Attack, 0);
  topAttack = valueOrDefault(topAttack, (d) => d.Attack, 0);

  let bottomHealth = healthDim.bottom(1)[0];
  let topHealth = healthDim.top(1)[0];

  bottomHealth = valueOrDefault(bottomHealth, (d) => d.Health, 0);
  topHealth = valueOrDefault(topHealth, (d) => d.Health, 0);

  this.chart
    .x(d3.scaleLinear().domain([bottomAttack - 1, topAttack + 1]))
    .y(d3.scaleLinear().domain([bottomHealth - 1, topHealth + 1]));

  attackDim.dispose();
  healthDim.dispose();
}

export default class AttackHealthChart {
  constructor(data, parent) {
    this.chart = dc.scatterPlot(parent);
    this.dim = data.dimension(d => [d.Attack, d.Health]);
    this.data = data;

    EventBus.on('data.changed', recomputeAxes.bind(this));

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .symbol(d3.symbolSquare)
      .xAxisLabel('Attack')
      .yAxisLabel('Health');

    recomputeAxes.call(this);
  }
}