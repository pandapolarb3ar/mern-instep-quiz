import React from 'react';
import PropTypes from 'prop-types';

function ConfirmAnswer(props) {
  return (
    <button className="confirm-answer" onClick = {props.onConfirmation}> Confirm  </button>
  );
};


ConfirmAnswer.propTypes = {
  onConfirmation: PropTypes.func.isRequired
};

export default ConfirmAnswer;