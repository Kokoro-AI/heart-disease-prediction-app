import moment from 'moment-timezone';
import React, { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import 'app/styles/custom/main.less';

import Notification from 'app/components/Notification';
import AppRoutes from 'app/routes/AppRoutes';
import Loading from 'app/components/Loading';

import 'app/i18n';

const MomentLocale = () => {
  const { i18n } = useTranslation();

  useEffect(() => { moment.locale(i18n.language); }, []);

  return null;
};

const App = () => (
  <RecoilRoot>
    <Suspense fallback={<Loading />}>
      <BrowserRouter basename={APP_BASE}>
        <MomentLocale />
        <Notification />
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);

export default App;
