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
      .order(Comparators.comparing(d => d.FactionSort.length).thenComparing('FactionSort').thenComparing('Cost').thenComparing('Name'))
      .on('renderlet', () => {
        this.lazy.update();
        let grid = this.chart.selectAll('.dc-grid-top');
        grid.classed('columns is-mobile is-multiline', true);
        grid.selectAll('.dc-grid-item').classed('column is-one-fifth', true);
      });

    this.search = dc.textFilterWidget('#search')
      .dimension(this.dim)
      .placeHolder('Card Name');

    dc.override(this.search, '_doRender', () => {
      this.search.__doRender();
      this.search.selectAll('input').classed('input is-hovered', true);
    });

      this.lazy = new LazyLoad();
  }
}
