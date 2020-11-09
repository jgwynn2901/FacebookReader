import React, { useReducer } from 'react';
import axios from 'axios';
import postContext from './postContext';
import postReducer from './postReducer';
import {
  GET_POSTS,
  POST_ERROR,
  CLEAR_POSTS
} from './types';

const PostState = props => {
  const initialState = {
    posts: null,
    user: { id: 1},
    loading: false
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Get posts
  const getPosts = async (id) => {
    try {
      console.log(`/api/posts/${id}`);
      const res = await axios.get(`/api/posts/${id}`);

      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Posts
  const clearPosts = () => {
    dispatch({ type: CLEAR_POSTS });
  };

  return (
    <postContext.Provider
      value={{
        posts: state.posts,
        user: state.user,
        error: state.error,
        getPosts,
        clearPosts
      }}
    >
      {props.children}
    </postContext.Provider>
  );

}

export default PostState;
