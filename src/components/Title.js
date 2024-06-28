import React from 'react';

const Title = ({ text, title }) => {
    return (
      <h1 className={title}>{text}</h1>
    );
  };

export default Title;
