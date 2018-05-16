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
      .domain(['{J}', '{P}', '{S}', '{F}', '{T}']);
      this.legend = dc.legend().legendText(d => this.titles(d.name));

    this.chart
      .dimension(this.dim)
      .group(this.dim.group())
      .title(d => this.titles(d.key) + ': ' + d.value)
      .label(d => '')
      .legend(this.legend)
      .ordering(dc.pluck('key'))
      ;
  }
}