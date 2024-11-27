import React from 'react';
import Loader from './Loader';

interface ButtonProps {
  label: string;
  loading: boolean;
  extraClass?:string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  loading,
  extraClass,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,

}) => {

  

  
  // Base styles for the button
  const baseStyles = `
  uppercase bg-primary h-12 text-secondary 
  dark:bg-secondary dark:text-primary 
  focus:outline-none transition ease-in-out 
  duration-200 hover:opacity-90 
  disabled:opacity-80 font-semibold 
  disabled:cursor-not-allowed`;

  // Variant styles based on the variant prop
  const variantStyles = {
    primary: 'bg-neutral-100  text-primary ',
    secondary: 'bg-gray-500 text-white',
    danger: 'bg-red-500 text-white',
  };

  // Size styles based on the size prop, with responsive considerations
  const sizeStyles = {
    small: 'px-4 py-2 w-1/3 text-sm md:px-6 md:py-3',
    medium: 'px-5 py-2 w-1/2 text-base md:px-8 md:py-4',
    large: 'px-6 py-2 text-lg w-full md:px-10 md:py-5',
  };

  return (
    <div className='flex items-center justify-center w-full'>
        <button
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${extraClass}`}
        disabled={disabled}
        
        >
        {loading?<Loader/>:label}
        </button>
    </div>
  );
};

export default Button;
