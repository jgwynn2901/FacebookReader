import {
  GET_POSTS,
  SET_LOADING,
  CLEAR_POSTS,
  POST_ERROR
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
      case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
