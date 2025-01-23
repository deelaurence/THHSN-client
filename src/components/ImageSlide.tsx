import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong,FaArrowRightLong } from "react-icons/fa6";
interface Images {
  images: string[];
}

const Slideshow: React.FC<Images> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const[overrideAutoSlide, setOverrideAutoslide]=useState<boolean>(false)


  if(slideDirection){
    
  }
  // Change slide automatically every 3 seconds
  useEffect(() => {
    if (overrideAutoSlide) return; // Stop auto slide if overrideAutoSlide is true

    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex, images.length, overrideAutoSlide]);

  const goToNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setSlideDirection('left');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative  overflow-hidden slideshow h-[32rem]">
      
      {/* Sliding Images Wrapper */}
      <div
        className="relative h-full flex transition-transform  duration-500 ease-in-out"
        style={{
          transform: `translateX(${-currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full  flex-shrink-0"
            style={{
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            <img
              className="object-cover h-full w-full"
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex items-baseline  absolute text-secondary bottom-2 right-2  justify-center ">
        <p className='text-sm font-semibold'>0{currentIndex+1}</p>
        <p className='text-[10px]'>/{images.length}</p>
      </div>

     {/* prev/next buttons */}
     {images.length>1&&<div className='absolute flex items-center gap-1 bottom-12 left-2'>
     
      {/* Navigation Buttons */}
      <button
        onClick={()=>{
          setOverrideAutoslide(true)
          goToPrevious()
        }}
        className="text-xs  z-10 bg-[rgba(255,255,255,.8)]  text-primary dark:text-secondary dark:bg-[rgba(0,0,0,.2)]  px-2 py-2 rounded-full"
      >
        <FaArrowLeftLong/>
      </button>
      <button
        onClick={()=>{
          goToNext()
          setOverrideAutoslide(true)
        }}
        className="  z-10 bg-[rgba(255,255,255,.7)]  text-primary dark:text-secondary dark:bg-[rgba(0,0,0,.2)] px-3 py-3 rounded-full"
      >
        <FaArrowRightLong/>
      </button>
     </div>}
      
    </div>
  );
};

export default Slideshow;
