import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { I18n } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import 'app/styles/custom/main.less';

import Loading from 'app/components/Loading';
import AppRoutes from 'app/routes/AppRoutes';

import 'app/i18n';

const App = () => (
  <RecoilRoot>
    <Suspense fallback={<Loading />}>
      <BrowserRouter basename={APP_BASE}>
        <I18n ns="translations">
          {
            (t, { i18n }) => (
              <AppRoutes t={t} translate={t} i18n={i18n} />
            )
          }
        </I18n>
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);

export default App;
