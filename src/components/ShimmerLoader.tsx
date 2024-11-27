import React from 'react';

const ShimmerLoader: React.FC = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-content">
        <div className="shimmer-thumbnail"></div>
        <div className="shimmer-line shimmer-line-short"></div>
        <div className="shimmer-line shimmer-line-long"></div>
      </div>
    </div>
  );
};

export default ShimmerLoader;
