import React from 'react';
import { Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

export const MergedProps = (props) => {
  const { component: Component, title, ...rest } = props;
  const { t, i18n } = useTranslation();

  return (
    <DocumentTitle title={t([`common:titles.${title}`, 'common:titles.app'])}>
      <Component {...rest} />
    </DocumentTitle>
  );
};

export const PropsRoute = ({ component, title, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <MergedProps
        {...routeProps}
        {...rest}
        component={component}
        title={title}
      />
    )}
  />
);

MergedProps.defaultProps = {
  title: 'app',
};

MergedProps.propTypes = {
  component: PropTypes.func.isRequired,
  title: PropTypes.string,
};

PropsRoute.defaultProps = {
  title: 'app',
};

PropsRoute.propTypes = {
  component: PropTypes.func.isRequired,
  title: PropTypes.string,
};
