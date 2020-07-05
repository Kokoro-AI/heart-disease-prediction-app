import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Responsive,
} from 'semantic-ui-react';

import Navbar from 'app/components/Layout/Navbar';

import kokoroLogo from 'app-static/images/kokoro.png';

const Layout = ({ children, active }) => {
  const [smallMenu, setSmallMenu] = useState(false);
  const [previousWidth, setPreviousWidth] = useState(null);
  const { t } = useTranslation('analysis');

  const navbarOptions = [{
    icon: 'play circle',
    to: '/analysis',
    name: 'analysis',
    text: t('options.analysis'),
  }];

  return (
    <>
      <Responsive
        fireOnMount
        onUpdate={(e, { width }) => {
          if (width !== previousWidth) {
            setPreviousWidth(width);
            setSmallMenu(width < 976);
          }
        }}
      />
      <Navbar
        user={{}}
        logo={kokoroLogo}
        smallMenu={smallMenu}
        showTitle
        showOptionText
        showProfilePath={false}
        translate={t}
        active={active}
        options={navbarOptions}
        onChangeSizeButtonClick={() => setSmallMenu(!smallMenu)}
      />
      <div className="container-content">
        {children}
      </div>
    </>
  );
};

Layout.defaultProps = {
  active: null,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.oneOf(['analysis']),
};

export default Layout;
