import 'd3';
import dc from 'dc';

export default class FactionChart {
  constructor(data, parent) {
    this.chart = dc.pieChart(parent);
    this.dim = data.dimension(d => d.Rarity);

    this.colors = d3.scaleOrdinal()
      .range(['#7f7f7f', '#2ca02c', '#1f77b4', '#ff7f0e', '#9467bd','#d62728'])
      .domain([
        'Common',
        'Uncommon',
        'Rare',
        'Legendary',
        'Promo',
        'None'
      ]);

    this.legendOrdering = d3.scaleOrdinal()
      .range(d3.range(this.colors.domain().length))
      .domain(this.colors.domain());

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .title(d => d.key + ': ' + d.value)
      .label(d => '')
      .legend(dc.legend())
      .colors(this.colors);

    dc.override(this.chart, 'legendables', () => this.chart._legendables().sort((a, b) => this.legendOrdering(a.name) - this.legendOrdering(b.name)));
  }
}