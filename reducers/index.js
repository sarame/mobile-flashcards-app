
import { GET_DECKS, ADD_DECK, REMOVE_DECK, ADD_QUESTION } from '../actions/index';

export default function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      const title = action.title
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };
    case REMOVE_DECK:
      delete state[action.title];
      return {
        ...state
      }; 
    case ADD_QUESTION:
      console.log(action)
      const Qtitle = action.title;
      const question = action.question
      console.log(Qtitle, question)
      return {
        ...state,
        [Qtitle]: {
          ...state[Qtitle],
          questions: [...state[Qtitle].questions].concat(question)
        }
      };  
    default:
      return state;
  }
}