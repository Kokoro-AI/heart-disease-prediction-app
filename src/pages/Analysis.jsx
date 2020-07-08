import _ from 'lodash';
import React, { useState } from 'react';

import SymptomsForm from 'app/containers/Symptoms';
import Analysis from 'app/containers/Analysis';
import Layout from 'app/components/Layout/Layout';

const AnalysisPage = () => {
  const [analysis, setAnalysis] = useState({});

  return (
    <Layout active="analysis">
      <SymptomsForm
        initialValues={analysis.symptoms}
      />
      <Analysis
        onSelect={setAnalysis}
        analysis={analysis}
      />
    </Layout>
  );
};

export default AnalysisPage;
