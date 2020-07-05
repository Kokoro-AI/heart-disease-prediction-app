import React from 'react';
import { Image } from 'semantic-ui-react';

import Layout from 'app/components/Layout/Layout';
import CrackedText from 'app/components/Animations/CrackedText';

import landing from 'app-static/images/landing.png';

const Landing = () => (
  <Layout>
    <Image
      centered
      size="huge"
      src={landing}
    />
    <CrackedText text="KOKORO AI" />
  </Layout>
);

export default Landing;
