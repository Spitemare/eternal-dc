import get from './utils/get';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import 'dc/dc.css';
import SetChart from './components/set-chart';
import FactionChart from './components/faction-chart';
import TypeChart from './components/type-chart';
import RarityChart from './components/rarity-chart';
import UnitTypeChart from './components/unit-type-chart';
import CostChart from './components/cost-chart';
import AttackHealthChart from './components/attack-health-chart';
import ImageChart from './components/image-chart';

get('./eternal-cards.json').then(cards => {
  dc.config.defaultColors(d3.schemeCategory10);

  cards.forEach(card => {
    let match = card.Influence.match(/{[FJPST]}/gi);
    if (match) match = match.map(c => c.replace(/({|})/g, ''));
    card.Factions = Array.from(new Set(match));
    if (!Array.isArray(card.Factions) || !card.Factions.length) card.Factions.push('Z');
    card.FactionSort = card.Factions.join('');
  });

  let data = crossfilter(cards);
  let setChart = new SetChart(data, '#set-chart');
  let factionChart = new FactionChart(data, '#faction-chart');
  let typeChart = new TypeChart(data, '#type-chart');
  let rarityChart = new RarityChart(data, '#rarity-chart');
  let unitTypeChart = new UnitTypeChart(data, '#unit-type-chart');
  let costChart = new CostChart(data, '#cost-chart');
  let imageChart = new ImageChart(data, '#image-chart');
  let attackHealthChart = new AttackHealthChart(data, '#attack-health-chart');

  dc.renderAll();
});
