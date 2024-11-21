// src/components/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black dark:text-white " >
      <h1 className="text-4xl font-bold mb-6">Welcome to the E-commerce Store</h1>
      <Link
        to="/admin/login"
        className="text-blue-500 hover:underline"
      >
        Admin Login
      </Link>
    </div>
  );
};

export default Home;
