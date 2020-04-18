import React from 'react';
import './App.css';
import logo from './infosys_logo.jpg';
import Quiz from './components/Quiz';
import Result from './components/Result';
import axios from 'axios'
import GetUser from './components/Login/elements/LoginService'

class App extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      username : props.username,
      testChoice : props.choice,
      reportID : '',
      counter: 0,
      questionId: 1,
      question: [],
      answerOptions: [],
      answer: '',
      answersCount: [],
      result: 0 ,
      done: false,
      hasSelected: false,
      score: 0,
      questions : props.questions,
      solvedAns : props.solvedAns,
      imgsrc : ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.confirmAnswer = this.confirmAnswer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
    
  componentDidMount() {
    
    const shuffledAnswerOptions = this.state.questions.map((question) => this.shuffleArray(question.answers));  
  
    this.setState({
      question: this.state.questions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      imgsrc : this.state.questions[0].imgsrc
    });
    // console.log(this.state.question);
    axios.get('http://34.91.61.43:5000/report/'+ this.state.username)
		.then(res =>{
      this.setState({
        reportID : res.data
      })
      // console.log(this.state.reportID)
    })
    this.startTimer();
  }
  
  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    
    return array;
  };

  setUserAnswer(answer) {
    this.state.answersCount.push(answer)
    this.setState({
      answer: answer
    });
  }

 
  
  handleAnswerSelected(event) {
    if(this.state.hasSelected) {
      this.state.answersCount.pop()
      this.setState({
        hasSelected:false
      })
    }

    this.setUserAnswer(event.currentTarget.value);
    // console.log(event.currentTarget.value);
    this.setState((state) => ({
      hasSelected : true,
    }))

  }

  confirmAnswer(event) {
      console.log(this.state);
      if (this.state.questionId < this.state.questions.length && this.state.hasSelected) {

        setTimeout(() => this.setNextQuestion(), 300);

      } else if (this.state.questionId >= this.state.questions.length && this.state.hasSelected) {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }

      this.setState((state) => ({
        hasSelected : false
        }));
  }


  startTimer() {
    setTimeout(() => alert('I am sorry but the time expired'), 1800000);
    setTimeout(() => this.setResults(this.getResults()), 1800000);
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.questions[counter].question,
      answerOptions: this.state.questions[counter].answers,
      imgsrc: this.state.questions[counter].imgsrc,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    //console.log(answersCount + "\n" + answersCountKeys + "\n" + answersCountValues);


    //get id of report of username

 
    //update with score
    // axios.post('https;//localhost:5000/users/)
      this.updateUser()
    var score = 0;
    for(var i = 0; i < answersCountValues.length; i++) {
      // console.log(answersCountValues[i] + " vs " + this.state.solvedAns[i])
      if (answersCountValues[i] === this.state.solvedAns[i])
      score ++
    }
    
    const data = {
      "username" : this.state.username,
      "score" : score,
      "test" : this.state.testChoice
    }
    // console.log("report id" + data)
    axios.post('http://34.91.61.43:5000/report/update/' + this.state.reportID, data)
    .then(res => res.status );
    return score;
  }

  updateUser = async(e) => {
    var user = await axios.get('http://34.91.61.43:5000/users/'+ this.state.username)
    .then(res => res.data[0] )
    console.log(user._id);
    const updatedUser = {
      "username" : user.username,
      "password" : user.password,
      "tested" : "true"
    }
    axios.post('http://34.91.61.43:5000/users/update/'+ user._id, updatedUser)
    .then(res => res.status)

  }

  setResults(score) {

      this.setState({
        result: score ,
        done : true
      });

  }
  renderQuiz() {
    // console.log("first"+ typeof(this.state.question));
    return (
      <Quiz
        imagePath ={this.state.imgsrc}
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        counter={this.state.counter}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.questions.length}
        onAnswerSelected={this.handleAnswerSelected}
        onConfirmation={this.confirmAnswer}

        
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} quizTotal={this.state.questions.length}/>;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>  
        {this.state.done ?  this.renderResult():this.renderQuiz()}
      </div>
    );
  }

}

export default App;

