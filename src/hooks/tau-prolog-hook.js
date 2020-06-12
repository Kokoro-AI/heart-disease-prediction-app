export const useTauProlog = () => {
  const { pl } = window;
  const session = pl.create();
  session.consult('kokoro.pl');

  const loadAnswer = () => session.answers((x) => x);
  const query = (q) => {
    session.query(q);
    // TODO
    const answer = loadAnswer();
    return answer;
  };

  return {
    pl: session,
    query,
  };
};

export const useHeartAnalyzer = (options = {}) => {
  const { pl, query } = useTauProlog('kokoro.pl');
  return {
    pl: { model: pl, options },
    analyze: (data) => {
      // FIXME this should be improved
      const disease = query(`${data}`);
      return disease ? 'disease' : 'no-disease';
    },
  };
};

export default {
  useTauProlog,
  useHeartAnalyzer,
};
