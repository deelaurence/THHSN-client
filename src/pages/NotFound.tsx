// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="text-center h-[70vh] flex flex-col items-center justify-center mt-20">
      <h1 className="text-7xl font-queens font-bold opacity-70">Page Not Found.</h1>
      <p className="mt-4 opacity-60">Sorry, the page you are looking for doesn't exist.</p>
      <Link className=' opacity-40 mt-4 underline' to={'/'}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
