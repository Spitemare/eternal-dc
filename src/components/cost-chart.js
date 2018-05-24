import dc from 'dc';

export default class CostChart {
  constructor(data, parent) {
    this.chart = dc.rowChart(parent);
    this.dim = data.dimension(d => d.Cost);

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .cap(7)
      .othersLabel('7+')
      .ordering(d => d.key)
      .elasticX(true);
  }
}