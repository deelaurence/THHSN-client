import React from 'react';
import { Sdk } from '../utils/sdk';
import Button from '../components/Button';
import WhyUs from '../components/LandingPage/WhyUs';
import ShopByCategory from '../components/LandingPage/ShopByCategory';
import ShopBestSellers from '../components/LandingPage/ShopBestSellers';
const { heroSectionImage } = new Sdk();

const Home: React.FC = () => {
  return (
    <section>
    <div
      style={{ backgroundImage: `url(${heroSectionImage})` }}
      className="relative bg-cover bg-center min-h-[80vh] -mt-12 flex px-6 pt-16 flex-col items-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary dark:bg-primary opacity-20"></div>

      {/* Grain Effect */}
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-0"></div>

      {/* Content */}
      <div className="relative mt-8 w-2/3 z-10 text-center">
        <h1 className="font-queens text-4xl text-center  font-medium mb-4">
          discover your perfect look.
        </h1>
        <p>
          Unlock your true beauty with our Exquisite Wigs
        </p>
        <Button loading={false} extraClass='w-fit mt-4 text-sm font-thin' label='shop now'/>
      </div>
    </div>
    <WhyUs/>
    <ShopByCategory/>
    <ShopBestSellers/>
    </section>
  );
};

export default Home;
