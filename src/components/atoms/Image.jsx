import React from 'react';

function Image({ src, alt, className }) {
  return <img src={src || undefined} alt={alt} className={className} />;
}

export default Image;