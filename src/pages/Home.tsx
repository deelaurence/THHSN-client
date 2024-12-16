import React from 'react';
import { Sdk } from '../utils/sdk';
import Button from '../components/Button';
import TheCollections from '../components/LandingPage/TheCollections';
import NewArrivals from '../components/LandingPage/NewArrival';
import IndulgeInLuxury from '../components/LandingPage/IndulgeInLuxury';
import FAQs from '../components/LandingPage/FAQs';
import BestSellers from '../components/LandingPage/BestSellers';
import { Link } from 'react-router-dom';
import Marquee from '../components/LandingPage/Marquee';
import TheLuxeExperience from '../components/LandingPage/LuxuryNotBasic';
const { heroSectionImage } = new Sdk();






const HeroSection1 = () => {
  return (
    <div
      // style={{ backgroundImage: `url(${heroSectionImage})` }}
      className="relative bg-mygray-gradient dark:text-primary justify-between overflow-hidden  h-[80vh]  sm:h-[80vh] tablet:h-[50vh] -mt-12 flex flex-col sm:flex-row pt-16 "
    >
      {/* <img src={heroSectionImage}  className="absolute -bottom-24  right-0  "/> */}
      

      {/* Grain Effect */}
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-10"></div>

      {/* Content */}
      <div className="-mt-8 sm:-mt-16 sm:-mr-32 sm:w-1/2 p-6 flex flex-col justify-center z-1">
        {/* <p className='cormorant-infant text-[4rem]'>The</p> */}
        <div className='flex  flex-col  sm:items-center  justify-end tablet:ml-44 '>
           
          <div className='relative text-center  '>
            <div className="relative   mb-4">
            <p className='absolute frunchy top-[7rem] sm:-left-14 sm:top-40 tablet:top-32 tablet:-left-8 -rotate-90 text-xl tablet:text-4xl sm:text-6xl tracking-widest'>
              THE
            </p>
            <h1 className='frunchy uppercase -mt-12 text-[50vw] sm:text-[18rem] tablet:text-[14rem]'>
              BEST
            </h1>
            </div>
          </div>
        <p className='text-[10vw] tablet:text-[3rem] overflow-visible sm:text-[3rem] opacity-90 tracking-[.5rem]  adelia font-thin -mt-32 text-center sm:-mt-48 tablet:-mt-36'>
           exquisite
        </p>
        <p className='tracking-[0.5rem] text-center sm:tracking-[1rem] text-sm sm:text-base opacity-70 uppercase'>hair experience</p>
        </div>
        <Link to={new Sdk().shopRoute}>
          <Button loading={false} extraClass='opacity-80 mt-3 sm:mt-8 py-2 text-xs  tablet:ml-44'  label='shop now'/>
        </Link>
      </div>
      <img src={heroSectionImage}  className="scale-[1.3] sm:scale-100 sm:w-[55%] tablet:scale-[1.3]  self-end"/>
    </div>
  )
}

// const HeroSection2 = () => {
//   return (
//     <div>
//       <div className='flex  flex-col  sm:items-center  justify-end tablet:ml-44 '>
           
//           <div className='relative text-center  '>
//             <h1 className=" relative oranienbaum mt-44 text-[50vw] sm:text-[5rem] mb-4">
//               THE&mdash;BEST
//             </h1>
//           </div>
//           <p className='text-[12vw] sm:text-[6rem]  tracking-[.5rem] sm:-ml-6 griff font-thin -mt-12 text-center sm:-mt-24 '>
//            exquisite
//           </p>
//         </div>
//         <Link to={new Sdk().shopRoute}>
//           <Button loading={false} extraClass='opacity-80 mt-3  bg-transparent py-4 text-xs tablet:ml-44'  label='shop now'/>
//         </Link>
//     </div>
//   )
// }





const Home: React.FC = () => {
  return (
    <section>
    <HeroSection1/>
    <Marquee text="Experience the best luxury hair" speed={6} />
    <TheCollections/>
    <IndulgeInLuxury/>
    <BestSellers/>
    <NewArrivals/>
    {/* <ShopByCategory/> */}
    {/* <ShopBestSellers/> */}
    <TheLuxeExperience/>
    <FAQs/>
    </section> 
  );
};

export default Home;
