import dc from 'dc';

export default class CountChart {
  constructor(data, parent) {
    this.chart = dc.numberDisplay(parent);

    this.chart
      .formatNumber(d3.format(',.0d'))
      .html({
        one:'%number Card',
        some:'%number Cards',
        none:'%number Cards'
      })
      .valueAccessor(d => d)
      .group(data.groupAll().reduceCount());
  }
}
