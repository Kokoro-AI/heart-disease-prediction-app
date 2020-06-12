import { selector } from 'recoil';

const asyncLocalStorage = {
  setItem: async (key, value) => (
    JSON.parse(localStorage.setItem(key, JSON.stringify(value || [])))
  ),
  getItem: async (key) => JSON.parse(localStorage.getItem(key)),
};

export const diseaseAnalysisHistory = selector({
  key: 'analysisHistory',
  get: async () => {
    let analysisHistory = [];

    try {
      analysisHistory = await asyncLocalStorage.getItem('analysisHistory');
    } catch (err) {
      console.log(err);
    }

    return analysisHistory || [];
  },
  set: (_, history) => {
    asyncLocalStorage.setItem('analysisHistory', history);
  },
});

export default { diseaseAnalysisHistory };
