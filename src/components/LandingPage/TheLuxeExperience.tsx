import { Sdk } from '../../utils/sdk'
const {heroSectionImage} = new Sdk()
import image1 from '../../assets/images/BestSellers/3.png'
import image2 from '../../assets/images/Collections/5.png'

const TheLuxeExperience = () => {
  return (
    <div
    // style={{ backgroundImage: `url(${heroSectionImage})` }}
    className="relative bg-mygray-gradient dark:text-primary justify-between overflow-hidden flex flex-row sm:flex-row  pt-16"
  >
    {/* <img src={heroSectionImage}  className="absolute -bottom-24  right-0  "/> */}
    

    {/* Grain Effect */}
    {/* <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50"></div> */}
    <div className='sm:h-auto sm:w-full'>
      <img src={image1}  className=""/>
    </div>
    {/* Content */}
    <div className='p-16 flex flex-col '>
        <h2 className='uppercase sm:text-[4rem] mb-16 leading-[4rem] font-medium'>
            the human hair shop &mdash;  <span className='opacity-80'> luxury </span> that IS anything but basic. 
        </h2>
        <p className='text-[2rem] amelia'>
            From silky straight to voluminous waves, our curated selection embodies sophistication, offering an indulgent twist to your hair game.
            Indulge in the art of flawless hair with collections crafted to elevate your everyday, offering beauty that feels as luxurious as it looks.
        </p>
        <p className='mt-16 text-[2rem] self-end pr-16 opacity-50 adelia'>Betran Bunds</p>
    </div>
  </div>
  )
}

export default TheLuxeExperience