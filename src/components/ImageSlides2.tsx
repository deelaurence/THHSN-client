import React, { useState, useEffect } from 'react';
import Button from './Button';

interface ImageObject {
  src: string;
  label: string;
  extraClass?: string;
  ctaLabel: string;
  ctaLink: string;
}

interface Images {
  images: ImageObject[];
}

const Slideshow: React.FC<Images> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Change slide automatically every 3 seconds
  console.log(slideDirection)
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex, images.length]);

  const goToNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(images.length / 3));
  };

  return (
    <div className="relative overflow-hidden slideshow h-72">
      {/* Sliding Images Wrapper */}
      <div
        className="relative flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(${-currentIndex * 100}%)`,
          width: `${(images.length / 3) * 100}%`, // Adjust width to fit all images in groups of 3
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-1/3 h-72 flex-shrink-0 relative" // Set width to 1/3 for each image
            style={{
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            <img
              className="object-cover h-full w-full"
              src={image.src}
              alt={`Slide ${index + 1}`}
            />
            <p
              className={`${
                image.extraClass ? image.extraClass : ''
              } absolute text-white px-2 left-6 top-6 uppercase`}
            >
              {image.label}
            </p>
            <Button
              extraClass="absolute bottom-0 font-thin"
              size="large"
              label={image.ctaLabel}
              loading={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
