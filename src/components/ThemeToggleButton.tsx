// components/ThemeToggleButton.tsx
import React from 'react';
import { useTheme } from '../contexts/AppContext';
import { FaRegMoon } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md  dark:bg-primary text-gray-800 dark:text-gray-200"
    >
      {theme === 'light' ? <FaRegMoon/> : <IoIosSunny/>}
    </button>
  );
};

export default ThemeToggleButton;
