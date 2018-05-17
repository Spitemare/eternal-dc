import dc from 'dc';
import LazyLoad from 'vanilla-lazyload';
import Comparators from 'comparators';

export default class ImageChart {
  constructor(data, parent) {
    this.chart = dc.dataGrid(parent);
    this.dim = data.dimension(d => d.Name);

    this.chart
      .dimension(this.dim)
      .group(d => d)
      .size(Infinity)
      .html(d => '<img class="lazy" data-src="' + d.ImageUrl + '"></img>')
      .htmlGroup(null)
      .order(Comparators.comparing('Factions').thenComparing('Cost').thenComparing('Name'))
      .on('renderlet', () => this.lazy.update());

      this.lazy = new LazyLoad();
  }
}
