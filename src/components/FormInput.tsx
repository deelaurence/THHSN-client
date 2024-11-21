import React, { useState, useEffect, useRef } from 'react';
import { sanitizerForm } from '../utils/sanitizeForm';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store.ts';
import { formIsValid } from '../store/adminSlice.ts';
import { SlInfo } from "react-icons/sl";

interface FormInputProps {
  type: string;
  name?: string;
  placeholder: string;
  value: string | number;
  required: boolean;
  fieldTip?: string;
  selectOptions?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ 
  type, 
  placeholder, 
  value, 
  fieldTip, 
  name, 
  required, 
  onChange, 
  selectOptions 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [singleInputError, setSingleInputError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSanitize = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    // Validate the input field
    const valid = sanitizerForm.validateInput(type, inputValue);

    // Update the global form validity in Redux
    dispatch(formIsValid(valid));

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
        <select
          value={value}
          required={required}
          onChange={handleSanitize}
          className={`${value === '' ? 'placeholder' : 'dark:text-neutral-300'} w-full py-2 border-b dark:border-neutral-600 bg-secondary border-neutral-700 focus:outline-none focus:dark:border-b-neutral-100 dark:bg-primary px-0`}
        >
          <option value="" disabled className="text-neutral-800">
            {placeholder}
          </option>
          {selectOptions.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          name={name}
          value={value}
          required={required}
          onChange={handleSanitize}
          className="w-full pl-1 border-b dark:border-neutral-600 bg-secondary border-neutral-700 focus:outline-none focus:dark:border-b-neutral-100 dark:bg-primary dark:text-neutral-300 resize-none overflow-hidden"
        />
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={handleSanitize}
          className="w-full pl-1 py-2 border-b dark:border-neutral-600 bg-secondary border-neutral-700 shadow-sm focus:outline-none focus:dark:border-b-neutral-100 dark:bg-primary dark:text-neutral-300"
        />
      )}
      {fieldTip && (
        <p className="text-primary dark:opacity-30 opacity-50 dark:text-secondary text-[10px] py-2 flex gap-1 items-center input-errors">
          <SlInfo /> {fieldTip}
        </p>
      )}
      {singleInputError && (
        <p className="dark:text-danger-light text-danger text-[10px] py-2 flex gap-1 items-center input-errors">
          <SlInfo /> {singleInputError}
        </p>
      )}
    </div>
  );
};

export default FormInput;
