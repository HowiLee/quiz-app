import { ANSWER_LIST_SELECTED, ANSWER_LIST_SUCCESS, CATEGORIES, QUESTIONS, RESET_STATE } from "./types";

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
function decodeHtml(s) {
  var txt = document.createElement("p");
  txt.innerHTML = decodeURIComponent(s);
  return txt.innerText;
}
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
          item.question = decodeHtml(item.question);
          item.answers = [];
          item.incorrect_answers.map(e => item.answers.push(decodeHtml(e)));
          const start = ((item.answers.length + 1) * Math.random()) | 0;
          item.answers.splice(start, 0, decodeHtml(item.correct_answer));
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

export const resetState = () => (dispatch) => dispatch({
  type: RESET_STATE
});

export const setAnswerListSelected = (answerLstSuccess) => (dispatch) =>
  dispatch({
    type: ANSWER_LIST_SELECTED,
    payload: answerLstSuccess,
  });