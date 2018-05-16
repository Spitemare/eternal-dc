import get from './utils/get';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import 'dc/dc.css';
import SetChart from './components/set-chart';
import FactionChart from './components/faction-chart';

get('./eternal-cards.json').then(cards => {
  cards = cards.map(card => {
    card.Factions = Array.from(new Set(card.Influence.match(/{[FJPST]}/gi)));
    return card;
  });
  let data = crossfilter(cards);
  let setChart = new SetChart(data, '#set-chart');
  let factionChart = new FactionChart(data, '#faction-chart');

  dc.renderAll();
});
