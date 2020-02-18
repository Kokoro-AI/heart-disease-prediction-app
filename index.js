const tauProlog = require('tau-prolog');
const fs = require('fs');
const repl = require('repl');

const program = fs.readFileSync('external/heart-disease-prediction-pl/kokoro.pl', 'utf8');

const pl = tauProlog.create();

pl.consult('external/heart-disease-prediction-pl/kokoro.pl');

const printAnswers = () => pl.answers((x) => console.log(tauProlog.format_answer(x)));

const query = (q) => { pl.query(q); printAnswers(); };

console.log('Welcome');
console.log('To run queries, use query("help")');
repl.start('> ').context.query = query;
