/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ANSWER_LIST_SELECTED } from "../../actions/types";
import './QuizMarker.css';
import { getCategory, getQuestions } from './../../actions/quizAction';

function QuizMarker() {
  const dispatch = useDispatch();
  const {answerSelected, answerSuccess, categories, questions} = useSelector((state)=>state.quizs);
  const [category, setCategory] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");

  React.useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleCreactQuiz = () => {
    dispatch(getQuestions(category, difficulty));
  };

  const isDisplaySubmit = React.useMemo(() => {
    if(answerSelected.some((e)=> e < 0)) {
      return false;
    }
    return true;
  }, [answerSelected]);

  return (
    <div className="quiz">
      <h1>Quiz Marker</h1>
      <div className="selectArea">
        <select
          id="categorySelect"
          className="form-select m-1 quizSelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories?.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
        <select
          id="difficultySelect"
          className="form-select m-1 quizSelect"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button id="createBtn" className="btn btn btn-outline-dark m-1" type="button" onClick={handleCreactQuiz}>
          Create
        </button>
      </div>
      { questions?.length > 0 ?
        questions.map((item, i) => 
          <div key={i} className="questionsArea m-3">
            <span>{item.question}</span>
            <div>
              {item.answers.map((answer, idx) => (
                <button key={'answer'+idx} className={`btn btn btn-outline-success mt-3 ${answerSelected[i] === idx ? "btnSelected" : "btnUnSelected"}`} type="button"
                  onClick={()=>{
                    const ans = [...answerSelected];
                    if(answerSelected[i] === idx) {
                      ans[i] = -1;
                    } else {
                      ans[i] = idx;
                    }
                    dispatch({
                      type: ANSWER_LIST_SELECTED,
                      payload: ans,
                    })
                  }}
                >{answer}</button>)
              )}
            </div>
          </div>
        )
        : <></>
      }
      { isDisplaySubmit && 
        <Link to="/results" state={{data: questions, answerSuccess, answerSelected}}> 
          <button id="btnSubmit" type="button" className="btn btn-secondary">Submit</button>
        </Link>
      }
    </div>
  );
}
export default QuizMarker;