import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from "react-icons/lia";
import { useRef } from 'react';
import image1 from "../../assets/images/Collections/1.png"
import image3 from "../../assets/images/Collections/3.png"
import image4 from "../../assets/images/Collections/4.png"
import image5 from "../../assets/images/Collections/7.png"
import image6 from "../../assets/images/Collections/6.png"

const store=[
    {
        text:"Curly",
        image:image1
    },
    {
        text:"Straight",
        image:image3
    },
    {
        text:"Lace Frontal",
        image:image4
    },
    {
        text:"Bundles",
        image:image5
    },
    {
        text:"Hair Care Products",
        image:image6
    },
]


const TheCollections = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      containerRef.current.scrollTo({
        left: scrollLeft + clientWidth,
        behavior: 'smooth',
      });
    }
  };
  const scrollPrev = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      containerRef.current.scrollTo({
        left: scrollLeft - clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="">
      <h2 className="text-3xl sm:text-4xl mx-6 sm:mx-16 mt-16 mb-6 font-queens  uppercase">The collections</h2>
      <div className="relative">
        {/* Scrollable Container */}
        <div
          className="flex  no-scrollbar overflow-x-auto scroll-snap-x snap-mandatory sm:px-16"
          ref={containerRef}
        >
          {store.map((item, index) => {
            return (
              <div
                className="min-w-64 sm:min-w-[30vw] tablet:min-w-[50vw] snap-start"
                key={index}
              >
                <div className="h-64 sm:h-[32rem]">
                  <img
                    className="object-cover h-full w-full px-1"
                    src={item.image}
                    alt=""
                  />
                </div>
                <p className="px-6 flex gap-2  justify-center font-queens items-center sm:text-3xl py-4">{item.text}</p>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2"
        >
          <LiaLongArrowAltRightSolid/>
        </button>
        {/* Next Button */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2"
        >
          <LiaLongArrowAltLeftSolid/>
        </button>
      </div>
    </section>
  );
};

export default TheCollections;
