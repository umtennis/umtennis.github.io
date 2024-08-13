import React from 'react';
import './CustomPreviewComponent.css';

const CustomPreviewComponent = ({ data }) => (
  <div className="custom-preview">
    <h3 className="custom-preview-title">{data.title}</h3>
    <img src={data.image} alt={data.title} className="custom-preview-image" />
    <p className="custom-preview-date">{new Date(data.date).toISOString().split('T')[0]}</p>
    <p className="custom-preview-description">{data.description}</p>
    <a href={data.url} className="custom-preview-url" target="_blank" rel="noopener noreferrer">
      Read more
    </a>
  </div>
);

export default CustomPreviewComponent;



