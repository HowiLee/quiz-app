/* eslint-disable import/no-anonymous-default-export */
import { ANSWER_LIST_SELECTED, ANSWER_LIST_SUCCESS, CATEGORIES, QUESTIONS, RESET_STATE } from "../actions/types";
import { ANSWER_DEFAULT } from "../constants/consts";

const initialState = {
  categories: [],
  questions: [],
  answerSelected: ANSWER_DEFAULT,
  answerSuccess: ANSWER_DEFAULT,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case ANSWER_LIST_SELECTED:
      return {
        ...state,
        answerSelected: action.payload,
      };
    case ANSWER_LIST_SUCCESS:
      return {
        ...state,
        answerSuccess: action.payload,
      };
    case RESET_STATE:
        return initialState;
    default:
      return state;
  }
}
