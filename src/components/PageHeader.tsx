import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import pattern from '../assets/images/circle-4-star-X-shape-bloat.png'


interface PageHeaderProps{
    heading: string;
    accent: string;
    backToRoute?:string;
    backToLabel?:string;
}


const PageHeader:React.FC<PageHeaderProps> = ({heading,accent,backToRoute,backToLabel}) => {
  return (
    <div className=' text-3xl mt-8 mb-14 font-queens relative z-[0] opacity-80 '>
        {/* <img className='absolute star-pattern top-0 w-[94vw] opacity-[.04] grayscale-[100%]' src={pattern} alt="" /> */}
        <p className='opacity-80 font-queens font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#de8500]  to-[#fc00ff]'>{heading}</p>
        <p className='font-queens'>{accent}</p>
        
        {backToRoute&&
          <Link 
          className="px-6 pt-[100px] text-xs right-0 absolute flex items-center gap-2 -top-8"
          to={backToRoute}>
          <FaArrowLeftLong/> {backToLabel??''}
        </Link>
        }
    </div>
  )
}

export default PageHeader