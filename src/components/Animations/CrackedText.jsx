import React from 'react';
import PropTypes from 'prop-types';

import './CrackedText.less';

const CrackedText = ({ text }) => (
  <div className="bg-text">
    <div id="text-slicer-gradient">
      {new Array(40).fill(1).map((_, i) => (
        <div key={`slice-${i + 1}`} className="text">{text}</div>
      ))}
    </div>
  </div>
);

CrackedText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CrackedText;
