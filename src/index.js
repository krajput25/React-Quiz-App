
import React, {Component} from "react";
import "./assets/style.css";
import ReactDOM from "react-dom";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox.js";
import Result from "./components/Result.js";

class Quizbee extends Component {

    state = {
        questionBank: [],                   
        score: 0,
        responses: 0
    };

    getQuestions = () => {                   
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };

    computeAnswer = (answer, correctAnswer) => {           
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            response: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    };

    playAgain = () => {
        this.setState({
            questionBank: [],
            score: 0,
            responses: 0
        });
        this.getQuestions();
    };


    componentDidMount() {                    
        this.getQuestions();
    }

    render () {                    
        return (   
                               
            <div className = "container">
                <div className="title">Take the Quiz and View Your Score Below!</div>
                
                {this.state.responses < 5 &&
                this.state.questionBank.length > 0 &&                 
                this.state.questionBank.map(
                        ({question, answers, correct, questionId}) => 
                        <QuestionBox 
                        question = {question}
                        options = {answers}
                        key = {questionId}
                        selected = {userSelection => this.computeAnswer(userSelection, correct)}
                        />
                    )
                }

               
                <Result score =  {this.state.score} playAgain = {this.playAgain} />
                
                   
            </div>
        );
    }    
}

ReactDOM.render (
    <Quizbee></Quizbee>,
    document.getElementById("root")
);

