import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import ImageItem from './imageItem';

const PostItem = ({ post }) => {
  const { title, text, uri } = post;

  return (
    <Fragment>
      <Media>
        <ImageItem uri={uri} />
        <Media.Body>
          <h3>{title}</h3>
          <p>{text}</p>
        </Media.Body>
      </Media>
    </Fragment>
  )};

PostItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostItem;