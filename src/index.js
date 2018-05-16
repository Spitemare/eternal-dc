import get from './utils/get';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import 'dc/dc.css';
import './components/set-number';
import SetNumber from './components/set-number';

get('./eternal-cards.json').then(cards => {
  let data = crossfilter(cards);
  let setNumber = new SetNumber(data, '#set-number');

  dc.renderAll();
});
