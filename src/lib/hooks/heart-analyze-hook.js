import { useHeartAnalyze as useMLHA } from './tfjs-hook';
import { useHeartAnalyze as usePlHA } from './tau-prolog-hook';

export const useMLHeartAnalyze = useMLHA;
export const usePlHeartAnalyze = usePlHA;

export const useHeartAnalyze = (data, options = {}) => {
  const ml = useMLHeartAnalyze(data, options);
  const pl = usePlHeartAnalyze(data, options);
  return { ml, pl };
};

export default {
  useHeartAnalyze,
  useMLHeartAnalyze,
  usePlHeartAnalyze,
};
