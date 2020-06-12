import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const renderMergedProps = (Component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);

  return (
    <Component {...finalProps} />
  );
};

export const PropsRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => renderMergedProps(component, routeProps, rest)}
  />
);

PropsRoute.defaultProps = {
};

PropsRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
