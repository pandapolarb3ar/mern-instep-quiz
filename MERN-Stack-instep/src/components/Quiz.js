import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import ConfirmAnswer from './ConfirmAnswer';



function Quiz(props) {

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
        
      />
    );
  }
  return (
      <div className="quiz">
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
        
        <Question content={props.question} />
        <img src = {props.imagePath} alt = ""/>


        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
        <ConfirmAnswer onConfirmation={props.onConfirmation}  />
        <br/><br/><br/>
      </div>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  counter: PropTypes.number.isRequired,
  question: PropTypes.array.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  imagePath: PropTypes.string.isRequired
};

export default Quiz;