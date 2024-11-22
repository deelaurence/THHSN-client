import React from 'react'


interface PageHeaderProps{
    heading: string;
    accent: string;
}


const PageHeader:React.FC<PageHeaderProps> = ({heading,accent}) => {
  return (
    <div className=' text-3xl mt-8 mb-14  opacity-80 '>
        <p className='opacity-80  font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#de8500]  to-[#fc00ff]'>{heading}</p>{accent}
    </div>
  )
}

export default PageHeader