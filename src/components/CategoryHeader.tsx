import React from 'react'


interface CategoryHeaderProps{
    heading: string;
    subheading: string;
}


const CategoryHeader:React.FC<CategoryHeaderProps> = ({heading,subheading}) => {
  return (
    <div className='mt-10'>
        <h1 className='font-semibold opacity-80 flex items-center gap-4 text-xl mb-1'>{heading}</h1>
        <p className='mb-6 text-xs opacity-60 dark:opacity-40'>{subheading}</p>
    </div>
  )
}

export default CategoryHeader