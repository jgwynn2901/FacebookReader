import React from 'react';
import PropTypes from 'prop-types';

const ImageItem = ({ uri }) => {
  const srcUri = './' + uri;
  console.log(srcUri);
return(
  <img 
  width={364}
  height={264}
  className="mr-3 p-3"  
  src={srcUri} />
)}

ImageItem.propTypes = {
  uri: PropTypes.string.isRequired
}

export default ImageItem;