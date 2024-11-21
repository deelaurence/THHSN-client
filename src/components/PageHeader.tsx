import React from 'react'


interface PageHeaderProps{
    heading: string;
    accent: string;
}


const PageHeader:React.FC<PageHeaderProps> = ({heading,accent}) => {
  return (
    <div className=' text-3xl my-8 font-semibold opacity-80'>
        <p className='opacity-80  font-medium'>{heading}</p>{accent}
    </div>
  )
}

export default PageHeader