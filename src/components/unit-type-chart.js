import 'd3';
import dc from 'dc';
import EventBus from '../utils/event-bus';

import './unit-type-chart.css';

function sort() {
  let domain = this.chart.group().all()
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value)
    .map(dc.pluck('key'));
  this.chart.x(d3.scaleBand().domain(domain));
}

export default class UnitTypeChart {
  constructor(data, parent) {
    this.chart = dc.barChart(parent);
    this.dim = data.dimension(d => d.UnitType || [], true);

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .width(800)
      .title(d => d.key + ': ' + d.value)
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      ;
    this.chart.margins().bottom = 50;
    sort.call(this);

    EventBus.on('chart.filter', sort.bind(this));
  }
}