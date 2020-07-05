import _ from 'lodash';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import SymptomsForm from 'app/containers/Symptoms';
import Analysis from 'app/containers/Analysis';
import Layout from 'app/components/Layout/Layout';
import { diseaseAnalysisHistory } from 'app/state';

const AnalysisPage = () => {
  const analysisHistory = useRecoilValue(diseaseAnalysisHistory);

  const [analysis, setAnalysis] = useState(_.first(analysisHistory) || {});

  const { predictions } = analysis;

  return (
    <Layout active="analysis">
      <SymptomsForm initialValues={analysis.symptoms} />
      {predictions && <Analysis onClick={setAnalysis} analysis={analysis} />}
    </Layout>
  );
};

export default AnalysisPage;
