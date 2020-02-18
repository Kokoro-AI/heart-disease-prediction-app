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

export default {
  useTauProlog,
};
