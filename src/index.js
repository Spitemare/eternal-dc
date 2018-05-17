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
import ImageChart from './components/image-chart';

get('./eternal-cards.json').then(cards => {
  dc.config.defaultColors(d3.schemeCategory10);

  cards.forEach(card => {
    card.Factions = Array.from(new Set(card.Influence.match(/{[FJPST]}/gi)))
    if (!Array.isArray(card.Factions) || !card.Factions.length) card.Factions.push('{0}');
  });

  let data = crossfilter(cards);
  let setChart = new SetChart(data, '#set-chart');
  let factionChart = new FactionChart(data, '#faction-chart');
  let typeChart = new TypeChart(data, '#type-chart');
  let rarityChart = new RarityChart(data, '#rarity-chart');
  let unitTypeChart = new UnitTypeChart(data, '#unit-type-chart');
  let costChart = new CostChart(data, '#cost-chart');
  let imageChart = new ImageChart(data, '#image-chart');

  dc.renderAll();
});
