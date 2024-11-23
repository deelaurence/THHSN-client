// src/components/LandingPage.tsx
import React from 'react';

interface PlaceholderProps{
    header:string;
    paragraph:string;
}

const Placeholder: React.FC<PlaceholderProps> = ({header,paragraph}) => {
  return (
    <div className="flex mx-6 py-12 flex-col items-center justify-center " >
      <h1 className="text-4xl font-bold mb-6">{header}</h1>
            {paragraph}
       </div>
  );
};

export default Placeholder;
