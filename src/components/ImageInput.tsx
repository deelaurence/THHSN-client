import React, { useState, useRef } from 'react';
import { SlInfo } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from 'react-icons/io5';
interface FormInputProps {
  type: string;
  name?: string;
  placeholder: string;
  required: boolean;
  fieldTip?: string;
  onChange: (files: FileList | null) => void;
  multiple?: boolean;
}

const ImageInput: React.FC<FormInputProps> = ({ 
  type, 
  name, 
  required, 
  onChange, 
  fieldTip, 
  multiple 
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onChange(files);

      // Create image previews
      const previewsArray = Array.from(files).map((file) => {
        return URL.createObjectURL(file);
      });
      setPreviews(previewsArray);
    }
  };

  const handleRemovePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      const files = Array.from(fileInputRef.current.files || []).filter((_, i) => i !== index);
      files.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;

      onChange(dataTransfer.files);
    }
  };

  return (
    <div className="pb-4">
      {type === 'file' ? (
        <>
          <input
            ref={fileInputRef}
            type="file"
            name={name}
            required={required}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="py-6  opacity-50 px-4 dark:bg-primary  dark:text-secondary flex items-center flex-col justify-center  rounded h-32 w-full border-dashed border-2 border-primary dark:border-secondary-dark   my-12 shadow-sm"
          >
            <IoCloudUploadOutline className='text-3xl'/>
            Upload Images
          </div>

          <div className="mt-4  flex flex-wrap justify-start gap-2 ">
            {previews.map((src, index) => (
              <div key={index} className={`${index===0?'w-full h-64':'w-[31%]'}   relative  h-20  rounded overflow-hidden`}>
                <img src={src}  alt={`preview-${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePreview(index)}
                  className="absolute top-0 right-0 bg-red-500 flex items-center justify-center text-white rounded-full w-5 h-5 text-xs"
                >
                  <IoCloseOutline />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {fieldTip && (
        <p className="text-primary dark:opacity-30 opacity-50 dark:text-secondary text-[10px] py-2 flex gap-1 items-center input-errors">
          <SlInfo /> {fieldTip}
        </p>
      )}
    </div>
  );
};

export default ImageInput;
