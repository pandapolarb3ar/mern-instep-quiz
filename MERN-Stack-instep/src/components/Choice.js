import React from 'react';
import quiz from '../api/quizQuestions';
import logo from '../../src/infosys_logo.jpg'
import Question from '../components/Question'
import ConfirmAnswer from '../components/ConfirmAnswer'
import App from '../App'
import ReportService from './Report/PostReport';
import ValidateCandidate from './Checks/ValidateCanditate'
import { Route, Redirect } from 'react-router-dom';
import StartPoint from './StartPoint';

class Choice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username : props.user,
      javaCheck :  false,
      cppCheck :  false,
      csharpCheck :  false,
      mlCheck :  false,
      choice : '',
      questions: [],
      solvedAns: [],
      go:false,
      confirmation : false,
      error : false
    };
    this.begin = this.begin.bind(this);
    this.nope = this.nope.bind(this);
    this.onTestSelect = this.onTestSelect.bind(this);
    this.onTestConfirmation = this.onTestConfirmation.bind(this);
    }

  onTestSelect(event) {
     var selection = event.currentTarget.value
     console.log(event.currentTarget.value);
     switch(selection) {
      case "Java":
        this.setState({
          javaCheck:true,
          cppCheck:false,
          csharpCheck:false,
          mlCheck:false,
          choice: 'java'
        });
        break;
      case "C#":
        this.setState({
          javaCheck:false,
          cppCheck:false,
          csharpCheck:true,
          mlCheck:false,
          choice : 'c#'
        });
        break;
      case "Cpp":
        this.setState({
          javaCheck:false,
          cppCheck:true,
          csharpCheck:false,
          mlCheck:false, 
          choice : 'cpp'
        });
        break;
      case "ML":
        this.setState({
          javaCheck:false,
          cppCheck:false,
          csharpCheck:false,
          mlCheck:true,
          choice: 'ml'
        });
        break;
        default:
          break;

     }
  }
 

setQuiz() {
  if(this.state.choice === 'cpp') {
    console.log("C++")
    this.setState({
      questions : quiz.Cpp.quizContent,
      solvedAns : quiz.Cpp.quizSolving
    });
  }

  else if(this.state.choice === 'c#') {
    console.log("Csharp")
    this.setState({
      questions : quiz.Csharp.quizContent,
      solvedAns : quiz.Csharp.quizSolving
    })
  }  else if(this.state.choice === 'java') {
    console.log("Java")
    this.setState({
      questions : quiz.Java.quizContent,
      solvedAns : quiz.Java.quizSolving
    })

  }  else if(this.state.choice === 'ml') {
    console.log("Machine Learning")
    this.setState({
      questions : quiz.MachineLearning.quizContent,
      solvedAns : quiz.MachineLearning.quizSolving
    })

  }
}

  onTestConfirmation() {
    this.setQuiz(this.state.choice)
    this.setState({
      confirmation : true
    })
  }

  begin = async (e) => {

    const report = {
      "username" : this.state.username,
      "score" : -1,
      "test": this.state.choice
    }
    // var reportStatus = 200
    var validation = await ValidateCandidate(this.state.username);
    if (validation === true) {
        alert("Sorry but it seems like you already took this test")
        // return (<div>YOU ALREADY TOOK TEST BITCH</div>)
        this.setState({
          error:true
            })
    }
     var reportStatus = await ReportService(report);
    if(reportStatus === 200)
      {    
        this.setState({
        go:true
          })
      } else 
      console.log(reportStatus);
  }
  nope() {
    this.setState({
      confirmation : false
    })
  }


  render() {
      if(this.state.error) 
          return <StartPoint />
      else if(this.state.go === true && this.state.questions !== undefined && this.state.solvedAns !== undefined ) 
          return (<App questions={this.state.questions} solvedAns={this.state.solvedAns} username = {this.state.username} choice = {this.state.choice} />);
  
  else 
    return(
  
    
    
    <div className="start-page">
    <img src={logo} className="App-logo" alt="logo" />
      <Question content={"You may choose from the test below, please take note you will not be able to come back to this choice so choose the test you are most confident in" }/>
      <li className="answerOption">
        <input type="radio" className="radioCustomButton" checked = {this.state.javaCheck} onChange = {this.onTestSelect} name="radioGroup" id={"Java"} value={"Java"} />
       <label className="radioCustomLabel" htmlFor={"Java"}> {'Java'} </label>
      </li>
      <li className="answerOption">
        <input type="radio" className="radioCustomButton"  checked = {this.state.cppCheck} onChange = {this.onTestSelect}  name="radioGroup" id={"Cpp"} value={"Cpp"} />
       <label className="radioCustomLabel" htmlFor={"Cpp"}> {'Cpp'} </label>
      </li>
      <li className="answerOption">
        <input type="radio" className="radioCustomButton" checked = {this.state.csharpCheck} onChange = {this.onTestSelect} name="radioGroup" id={"C#"} value={"C#"} />
       <label className="radioCustomLabel" htmlFor={"C#"}> {'C#'} </label>
      </li>
      <li className="answerOption">
        <input type="radio" className="radioCustomButton" checked = {this.state.mlCheck} onChange = {this.onTestSelect} name="radioGroup" id={"ML"} value={"ML"} />
       <label className="radioCustomLabel" htmlFor={"ML"}> {'Machine Learning'} </label>
      </li>
      <div className="confirmation-div">
        <ConfirmAnswer onConfirmation={this.onTestConfirmation} />
        {this.state.confirmation ?<div className = "areyousure"> Are you sure ?  
                                    <button onClick = {this.begin} value = "begin"> Yes</button>
                                    <button onClick = {this.nope} value = "begin"> No</button>
                                    </div> : <div></div>}
        </div>
        <br></br>
    </div>)
  }

}

export default Choice;