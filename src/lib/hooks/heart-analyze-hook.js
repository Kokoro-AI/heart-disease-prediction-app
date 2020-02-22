import { useHeartAnalyzer as useMLHA } from './tfjs-hook';
import { useHeartAnalyzer as usePlHA } from './tau-prolog-hook';

export const useMLHeartAnalyzer = useMLHA;
export const usePlHeartAnalyzer = usePlHA;

export const useHeartAnalyzer = (options = {}) => {
  const ml = useMLHeartAnalyzer(options.ml);
  const pl = usePlHeartAnalyzer(options.pl);

  const analyze = (data) => ({
    mlPrediction: ml.analyze(data),
    plPrediction: pl.analyze(data),
  });

  return { analyze, ml, pl };
};

export default {
  useHeartAnalyzer,
  useMLHeartAnalyzer,
  usePlHeartAnalyzer,
};
