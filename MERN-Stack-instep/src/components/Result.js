import React from 'react';
import PropTypes from 'prop-types';


function Result(props) {
  return (
    
      <div className = "Results">
        Congratioulations you scored
        Results :  <strong>{props.quizResult}</strong> out of {props.quizTotal}!
        <p>Depending on this you may be a step closer towards your journey at Infosys</p>
      </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.number.isRequired,
  quizTotal: PropTypes.number.isRequired
};

export default Result;