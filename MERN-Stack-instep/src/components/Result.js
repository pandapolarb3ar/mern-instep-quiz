import React from 'react';
import PropTypes from 'prop-types';


function Result(props) {
  return (
    
      <div>
        Results :  <strong>{props.quizResult}</strong> out of {props.quizTotal}!
      </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.number.isRequired,
  quizTotal: PropTypes.number.isRequired
};

export default Result;