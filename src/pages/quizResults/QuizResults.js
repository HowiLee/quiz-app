import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RESET_STATE } from './../../actions/types';
import './QuizResults.css';

function QuizResults() {
  const dispatch = useDispatch();
  const {answerSelected, answerSuccess, questions} = useSelector((state)=>state.quizs);
  const scored  = React.useMemo(()=>{
    let count = 0;
    answerSuccess.forEach((e, i) => {
      if(e === answerSelected[i]){
        count++;
      }
    });
    return count;
  }, [answerSuccess, answerSelected]);
    return (
      <div className="quizResult">
        <h1>RESULTS</h1>
        {questions.map((item, i) => <div key={i} className="questionsArea m-3">
            <span>{item.question}</span>
            <div>
              {item.answers.map((answer, idx) => (
                <span key={idx} className={`answer mt-3 ${answerSuccess[i] === idx || (answerSuccess[i] === idx && answerSelected[i] === idx) ? "answerCorrect" : answerSelected[i] === idx ? "answerFail" : ''}`}>{answer}</span>)
              )}
            </div>
        </div>
        )}
        <div>
          <span className={`notify ${scored < 2 ? 'stsDanger' : scored < 4 ? 'stsWarning': 'stsSucces'}`}>You scored {scored} out of 5</span>
        </div>
        <Link to="/"> 
          <button id="btnCreateQuiz" type="button" className="btn btn-secondary m-3" onClick={()=>{
            dispatch({
              type: RESET_STATE
            });
          }}>Create a new quiz</button>
        </Link>
      </div>
    );
  }
  export default QuizResults;
  