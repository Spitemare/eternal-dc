import get from './utils/get';
import EventBus from './utils/event-bus';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import * as Charts from './components/charts';

dc.config.defaultColors(d3.schemeCategory10);

let data = crossfilter([]);
data.onChange(() => EventBus.emit('data.filtered', {...arguments}));

let fetch = (url) => {
  get(url).then(cards => {
    cards.forEach(card => {
      let match = card.Influence.match(/{[FJPST]}/gi);
      if (match) match = match.map(c => c.replace(/({|})/g, ''));
      card.Factions = Array.from(new Set(match));
      if (!Array.isArray(card.Factions) || !card.Factions.length) card.Factions.push('Z');
      card.FactionSort = card.Factions.join('');
    });

    dc.filterAll();

    data.remove();
    data.add(cards);

    EventBus.emit('data.changed');
    dc.redrawAll();
  });
}

let setChart = new Charts.SetChart(data, '#set-chart');
let factionChart = new Charts.FactionChart(data, '#faction-chart');
let typeChart = new Charts.TypeChart(data, '#type-chart');
let rarityChart = new Charts.RarityChart(data, '#rarity-chart');
let unitTypeChart = new Charts.UnitTypeChart(data, '#unit-type-chart');
let costChart = new Charts.CostChart(data, '#cost-chart');
let imageChart = new Charts.ImageChart(data, '#image-chart');
let attackHealthChart = new Charts.AttackHealthChart(data, '#attack-health-chart');
let countChart = new Charts.CountChart(data, '#count-chart');

dc.renderAll();

document.getElementById('reset').onclick = () => {
  document.querySelector('#search>input').value = '';
  dc.filterAll();
  dc.redrawAll();
  return false;
}

document.querySelectorAll('.navbar a').forEach(a => {
  a.onclick = (e) => {
    e.preventDefault();
    document.querySelectorAll('.navbar a').forEach(b => b.classList.remove('is-active'));
    a.classList.add('is-active');
    fetch(a.dataset.url);
  }
});

if (location.hash.indexOf('draft-packs') > -1) document.getElementById('draft-packs').click();
else document.getElementById('all-cards').click();
