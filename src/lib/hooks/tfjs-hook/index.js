import useModelHook from './use-model';
import usePredictionHook from './use-prediction';
import useHeartAnalyzerHook from './use-heart-analyze';

export const useModel = useModelHook;
export const usePrediction = usePredictionHook;
export const useHeartAnalyzer = useHeartAnalyzerHook;

export default {
  useModel,
  usePrediction,
  useHeartAnalyzer,
};
