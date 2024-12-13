import image1 from '../../assets/images/BestSellers/3.png'

const TheLuxeExperience = () => {
  return (
    <div
    // style={{ backgroundImage: `url(${heroSectionImage})` }}
    className="pb-16 sm:pb-0 relative bg-mygray-gradient dark:text-primary overflow-hidden flex flex-col sm:flex-row"
  >
    {/* <img src={heroSectionImage}  className="absolute -bottom-24  right-0  "/> */}
    

    {/* Grain Effect */}
    {/* <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50"></div> */}
    <div 
    className=' sm:h-[170vh] sm:w-[40%] '>
      <img src={image1}  className="sm:h-full w-full sm:w-auto object-cover"/>
    </div>
    {/* Content */}
    <div className='p-6 sm:p-16 sm:w-[60%] flex flex-col'>
        <h2 className='uppercase text-[3rem] leading-[3rem] sm:text-[3rem] mb-16 sm:leading-[3.4rem] font-medium'>
            luxury, not basic &mdash;  <span className='opacity-70'> experience </span> the best with our 100 percent raw hair and products. 
        </h2>
        <p className='text-[1.5] sm:text-[2rem] amelia'>
            From silky straight to voluminous waves, our curated selection embodies sophistication, offering an indulgent twist to your hair game.
            Indulge in the art of flawless hair with collections crafted to elevate your everyday, offering beauty that feels as luxurious as it looks.
        </p>
        <p className='mt-6 sm:mt-16 text-[2rem] self-end pr-16  opacity-50 adelia'>Betran Bunds</p>
    </div>
  </div>
  )
}

export default TheLuxeExperience