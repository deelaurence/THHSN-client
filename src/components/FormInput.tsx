import React, { useState, useEffect, useRef } from 'react';
import { sanitizerForm } from '../utils/sanitizeForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store.ts';
import { formIsValid } from '../store/adminSlice.ts';
import { user_formIsValid } from '../store/userSlice.ts';
import { SlInfo } from "react-icons/sl";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

interface FormInputProps {
  type: string;
  name?: string;
  placeholder: string;
  value: string | number;
  required: boolean;
  fieldTip?: string;
  extraclass?:string;
  disabled?: boolean;
  selectOptions?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  fieldTip,
  extraclass,
  disabled,
  name,
  required,
  onChange,
  selectOptions
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [singleInputError, setSingleInputError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSanitize = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    // Validate the input field
    const valid = sanitizerForm.validateInput(type, inputValue);

    // Update the global form validity in Redux
    dispatch(formIsValid(valid));
    dispatch(user_formIsValid(valid));

    // Update the local validity state for error display
    setSingleInputError(valid);
  };

  // Auto-expand the textarea as content grows
  useEffect(() => {
    if (type === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, type]);

  return (
    <div className="pb-4">
      {type === 'select' && selectOptions ? (
        <div className="relative">
          <select
            value={value}
            required={required}
            onChange={handleSanitize}
            className={`${value === '' ? 'placeholder' : 'dark:text-neutral-300'} w-full py-2 border-b dark:border-neutral-600 bg-secondary border-neutral-700 focus:outline-none focus:dark:border-b-neutral-100 dark:bg-primary px-0`}
          >
            <option value="" disabled className="text-neutral-500 text-xs font-medium">
              {placeholder}
            </option>
            {selectOptions.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="absolute opacity-50 top-1/2 right-0 -translate-y-1/2">
            <MdKeyboardArrowDown />
          </p>
        </div>
      ) : type === 'textarea' ? (
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          name={name}
          value={value}
          required={required}
          onChange={handleSanitize}
          className={`${extraclass??''} w-full pl-1 border-b dark:border-neutral-600 bg-secondary border-neutral-700 focus:outline-none focus:dark:border-b-neutral-100 dark:bg-primary dark:text-neutral-300 resize-none overflow-hidden`}
        />
      ) : type === 'password' ? (
        <div className="relative">
          <label className="block mb-2 text-[10px] opacity-80">{placeholder}</label>
          <input
            placeholder={placeholder}
            type={showPassword ? 'text' : 'password'} // Toggle between text and password type
            name={name}
            disabled={disabled}
            value={value}
            required={required}
            onChange={handleSanitize}
            className="w-full pl-1 py-2 border-b dark:border-neutral-600 bg-secondary border-neutral-700 shadow-sm focus:outline-none focus:dark:border-b-neutral-100 dark:bg-primary dark:text-neutral-300"
          />
          <span
            className="absolute  opacity-70 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Display eye icon */}
          </span>
        </div>
      ) : (
        <div>
          <label className="block mb-2 text-[10px] opacity-80">{placeholder}</label>
          <input
            placeholder={placeholder}
            type={type}
            name={name}
            disabled={disabled}
            value={value}
            required={required}
            onChange={handleSanitize}
            className="w-full pl-1 py-2 border-b dark:border-neutral-600 bg-secondary border-neutral-700 shadow-sm focus:outline-none focus:dark:border-b-neutral-100 dark:bg-primary dark:text-neutral-300"
          />
        </div>
      )}
      {fieldTip && (
        <p className="text-primary dark:opacity-30 opacity-50 dark:text-secondary text-[10px] py-2 flex gap-1 items-center input-errors">
          <SlInfo /> {fieldTip}
        </p>
      )}
      <p
        className={`dark:text-danger-light -mb-4 text-danger text-[10px] py-2 flex gap-1 items-center input-errors 
          transition-opacity duration-300 ${singleInputError ? 'opacity-100' : 'opacity-0'}`}
      >
        <SlInfo className="my-1" />
        {singleInputError ?? 'Something went wrong'}
      </p>
    </div>
  );
};

export default FormInput;
