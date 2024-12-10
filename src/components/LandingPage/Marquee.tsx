import React from 'react';
import { FaAsterisk } from 'react-icons/fa';
import { SiInfluxdb } from "react-icons/si";
type MarqueeProps = {
  text: string; // The text to display in the marquee
  speed?: number; // Animation speed in seconds (default: 10)
};

const Marquee: React.FC<MarqueeProps> = ({ text, speed = 10 }) => {
  return (
    <div className="relative  overflow-hidden whitespace-nowrap w-full h-10 bg-gray-100">
      <div
        className="absolute top-1/4 translate-y-1/2  flex items-center animate-marquee space-x-4"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {/* Repeat the icons and text multiple times for seamless scrolling */}
        {[...Array(10)].map((_, index) => (
          <React.Fragment key={index}>
            <SiInfluxdb className="text-xl text-orange-600" />
            <span className="font-queens uppercase mx-4">{text}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
