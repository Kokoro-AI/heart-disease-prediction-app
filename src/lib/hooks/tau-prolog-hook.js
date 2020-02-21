export const useTauProlog = () => {
  const { pl } = window;

  const session = pl.create();
  session.consult('kokoro.pl');

  const printAnswers = () => session.answers((x) => console.log(pl.format_answer(x)));
  const query = (q) => { session.query(q); printAnswers(); };

  return {
    pl: session,
    query,
  };
};

export const useHeartAnalyze = (data, options = {}) => {
  const { query } = useTauProlog('kokoro.pl');
  console.log('analyzing data...', data, options);
  query('disease(p1)');
  return {};
};

export default {
  useTauProlog,
  useHeartAnalyze,
};
