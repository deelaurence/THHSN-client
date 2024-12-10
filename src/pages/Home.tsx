import React from 'react';
import { Sdk } from '../utils/sdk';
import Button from '../components/Button';
import TheCollections from '../components/LandingPage/TheCollections';
import ShopByCategory from '../components/LandingPage/ShopByCategory';
import ShopBestSellers from '../components/LandingPage/ShopBestSellers';
import FAQs from '../components/LandingPage/FAQs';
import { Link } from 'react-router-dom';
import Marquee from '../components/LandingPage/Marquee';
const { heroSectionImage } = new Sdk();

const Home: React.FC = () => {
  return (
    <section>
    <div
      // style={{ backgroundImage: `url(${heroSectionImage})` }}
      className="relative bg-mygray-gradient dark:text-primary justify-between overflow-hidden  h-[80vh]  sm:h-[80vh] tablet:h-[50vh] -mt-12 flex flex-col sm:flex-row pt-16 "
    >
      {/* <img src={heroSectionImage}  className="absolute -bottom-24  right-0  "/> */}
      

      {/* Grain Effect */}
      {/* <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-100"></div> */}

      {/* Content */}
      <div className="-mt-8 sm:-mt-16 sm:-mr-32 sm:w-1/2 p-6 flex flex-col justify-center z-1">
        {/* <p className='cormorant-infant text-[4rem]'>The</p> */}
        <div className='flex  flex-col  sm:items-center  justify-end tablet:ml-44 '>
           
          <div className='relative text-center  '>
            <h1 className="frunchy relative  font-thin -my-12 text-[50vw]  sm:text-[18rem] mb-4">
            <p className='absolute frunchy top-[7rem]  sm:-left-14 sm:top-40 tablet:top-44 tablet:-left-8 -rotate-90 text-xl tablet:text-4xl sm:text-6xl tracking-widest'>
              THE
            </p>
               BEST
            </h1>
          </div>
        <p className='text-[12vw] sm:text-[4rem] opacity-90 tracking-[.5rem] sm:-ml-12 adelia -mt-32 text-center sm:-mt-44 '>
           luxurious
        </p>
        <p className='tracking-[0.5rem] text-center sm:tracking-[1rem] text-sm sm:text-base opacity-70 sm:-ml-12 '>HAIR EXPERIENCE</p>
        </div>
        <Link to={new Sdk().shopRoute}>
          <Button loading={false} extraClass='opacity-80 mt-3 sm:mt-8 rounded-full text-xs tablet:ml-44'  label='shop now'/>
        </Link>
      </div>
      <img src={heroSectionImage}  className="scale-[1.3] sm:scale-100 sm:w-[55%]  self-end"/>
    </div>
    <Marquee text="Experience the best luxury hair" speed={6} />
    <TheCollections/>
    <ShopByCategory/>
    <ShopBestSellers/>
    <FAQs/>
    </section> 
  );
};

export default Home;
