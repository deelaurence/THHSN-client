import React from 'react';
import { useTheme } from '../contexts/AppContext';
import { FaRegMoon } from "react-icons/fa6";
import { MdOutlineLight } from 'react-icons/md';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="relative w-16 h-5 shadow  border-neutral-500 border   dark:bg-primary-light  rounded-full cursor-pointer flex items-center transition-all duration-300"
    >
      <div
        className={`absolute left-1  w-4 h-full rounded-full  flex items-center justify-center transition-all duration-300 ${
          theme === 'light' ? 'translate-x-0' : ' translate-x-10'
        }`}
      >
        {theme === 'light' ? (
          <FaRegMoon className="text-primary rounded-full h-2 w-2 p-1 shadow bg-white border border-neutral-500  text-lg" />
        ) : (
          <MdOutlineLight className=" w-4 h-4 bg-neutral-200 rounded-full text-neutral-500   text-3xl " />
        )}
      </div>
      <div
        className={`absolute left-1 text-[8px] w-4 h-full rounded-full  flex items-center justify-center transition-all duration-300 ${
          theme === 'dark' ? 'translate-x-2' : ' translate-x-8'
        }`}
      >
        {theme === 'light' ? (
          <p className='font-semibold uppercase text-neutral-500 mt-[0.3px]'>Dark</p>
        ) : (
          <p className='font-semibold uppercase text-neutral-500 mt-[0.4px]'>light</p>
        )}
      </div>
    </div>
  );
};

export default ThemeToggleButton;
