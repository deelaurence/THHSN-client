import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from "react-icons/lia";
import React, { useRef, useState } from "react";
import Button from "../Button";

interface StoreItem {
  text: string;
  image: string;
  secondaryImage?: string; // Add an optional secondary image
  price: number;
  path: string;
}

interface BestSellersProps {
  store: StoreItem[];
  title: string;
  subtitle: string;
}

const BestSellersAndNewArrivals: React.FC<BestSellersProps> = ({
  store,
  title,
  subtitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollNext = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      containerRef.current.scrollTo({
        left: scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      containerRef.current.scrollTo({
        left: scrollLeft - clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section>
      <h2 className="text-2xl mt-16 font-queens uppercase px-6 sm:px-16 mx-auto">
        {title}
      </h2>
      <p className="px-6 sm:px-16 mb-4 text-xs">{subtitle}</p>
      <div className="relative">
        {/* Scrollable Container */}
        <div
          className="flex no-scrollbar overflow-x-auto scroll-snap-x snap-mandatory sm:px-16"
          ref={containerRef}
        >
          {store.map((item, index) => (
            <div
              className="min-w-64 sm:min-w-[25vw] tablet:min-w-[50vw] snap-start relative"
              key={index}
              
            >
              <div 
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="h-64 sm:h-[24rem] relative overflow-hidden cursor-pointer">
                {/* Primary Image */}

                <img
                  className={`object-cover h-full w-full px-1 transition-opacity duration-1000 ${
                    hoveredIndex === index ? "opacity-10" : "opacity-100 "
                  }`}
                  src={item.image}
                  alt={item.text}
                />
                {/* Secondary Image */}
                {item.secondaryImage && (
                  <img
                    className={`absolute inset-0 object-cover h-full w-full px-1  transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                    src={item.secondaryImage}
                    alt={`${item.text} - Hover`}
                  />
                )}
              </div>
              <div className="h-24">
                <p className="px-2 flex gap-2 font-queens text-sm sm:text-xl pt-4 uppercase">
                  {item.text}
                </p>
                <p className="font-queens px-2">${item.price}.00 </p>
              </div>
              <Button
                extraClass="text-xs mx-1 py-2 capitalize"
                size="large"
                label="Add to Cart"
                loading={false}
              />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-secondary h-8 w-8 rounded-full flex items-center justify-center"
        >
          <LiaLongArrowAltRightSolid />
        </button>
        {/* Previous Button */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary text-secondary h-8 w-8 rounded-full flex items-center justify-center"
        >
          <LiaLongArrowAltLeftSolid />
        </button>
      </div>
    </section>
  );
};

export default BestSellersAndNewArrivals;
