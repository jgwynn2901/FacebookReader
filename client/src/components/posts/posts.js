import React, {  useEffect, useContext } from 'react';
import PostItem from './postItem';
import Spinner from '../layout/Spinner';
import PostContext from '../../context/postContext';

const Posts = () => {
  const postContext = useContext(PostContext);
  const { posts, getPosts, loading, user } = postContext;

  useEffect(() => {
    getPosts(user.id);
    // eslint-disable-next-line
  }, []);

  if (posts !== null && posts.length === 0 && !loading) {
    return <h4>No posts returned.</h4>;
  }

  return (
    <div>
      {posts !== null && !loading ? (      
        posts.map(post => (
          <PostItem post={post} />
              
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Posts;