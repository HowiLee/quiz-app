import { ANSWER_LIST_SUCCESS, CATEGORIES, QUESTIONS } from "./types";

export const getCategory = () => (dispatch) => {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: CATEGORIES,
        payload: data["trivia_categories"] || [],
      })
    );
};

export const getQuestions = (category, difficulty) => (dispatch) => {
  const answerSuccessIdx = [];
  let results = [];
  fetch(
    `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
  )
    .then((response) => response.json())
    .then((data) => {
      results = data["results"] || [];
      if (results.length > 0) {
        results.forEach((item) => {
          item.answers = [...item.incorrect_answers];
          const start = ((item.answers.length + 1) * Math.random()) | 0;
          item.answers.splice(start, 0, item.correct_answer);
          answerSuccessIdx.push(start);
        });
        dispatch({
          type: ANSWER_LIST_SUCCESS,
          payload: answerSuccessIdx,
        });
      }
      dispatch({
        type: QUESTIONS,
        payload: results,
      });
    });
};