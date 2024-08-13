import React from 'react';

const DefaultPreviewComponent = ({ data }) => {
  return (
    <div className="link-preview">
      <img src={data.image} alt={data.title} style={{ width: '100%', height: 'auto' }} />
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        {data.url}
      </a>
    </div>
  );
};

export default DefaultPreviewComponent;
