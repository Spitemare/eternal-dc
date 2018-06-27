import get from './utils/get';
import EventBus from './utils/event-bus';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import * as Charts from './components/charts';

get('./draft-packs.json').then(cards => {
  dc.config.defaultColors(d3.schemeCategory10);

  cards.forEach(card => {
    let match = card.Influence.match(/{[FJPST]}/gi);
    if (match) match = match.map(c => c.replace(/({|})/g, ''));
    card.Factions = Array.from(new Set(match));
    if (!Array.isArray(card.Factions) || !card.Factions.length) card.Factions.push('Z');
    card.FactionSort = card.Factions.join('');
  });

  let data = crossfilter(cards);
  data.onChange(() => EventBus.emit('data.filtered', {...arguments}));

  let setChart = new Charts.SetChart(data, '#set-chart');
  let factionChart = new Charts.FactionChart(data, '#faction-chart');
  let typeChart = new Charts.TypeChart(data, '#type-chart');
  let rarityChart = new Charts.RarityChart(data, '#rarity-chart');
  let unitTypeChart = new Charts.UnitTypeChart(data, '#unit-type-chart');
  let costChart = new Charts.CostChart(data, '#cost-chart');
  let imageChart = new Charts.ImageChart(data, '#image-chart');
  let attackHealthChart = new Charts.AttackHealthChart(data, '#attack-health-chart');

  document.getElementById('reset').onclick = () => {
    document.querySelector('#search>input').value = '';
    dc.filterAll();
    dc.redrawAll();
    return false;
  }

  dc.renderAll();
});
