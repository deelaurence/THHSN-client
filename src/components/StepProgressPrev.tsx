import React from 'react'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { ReactNode } from 'react'

export interface MenuItems{
    label:string;
    route:string;
    icon:ReactNode;
    component:ReactNode
}

interface StepProgressProps{
    menuItems:MenuItems[];
    currentMenu:number;
    setCurrentMenu: (index:number)=>void;
}



const StepProgess:React.FC<StepProgressProps> = ({menuItems,currentMenu,setCurrentMenu}) => {
  return (
    <div className='flex relative justify-between gap-10'>
          {menuItems.map((item, index) => (
            <div 
            key={index} 
            className={`${index<currentMenu+1? '  ':'dark:text-secondary-veryDark text-neutral-300'} relative z-40 flex flex-col font-medium text-xs gap-1`}
            onClick={() => setCurrentMenu(index)}>
              <div className='flex gap-1 '>

                <div className=' flex flex-col items-center'>
                  <div className='relative '>
                    {index!==menuItems.length-1&&<span className={`${index<currentMenu?'':'opacity-30'} border  border-dashed dark:border-neutral-600 border-neutral-300  absolute top-1/2 -z-10 h-[0.5px] w-[45vw] `}> </span>}
                    {
                    index<currentMenu?
                    <IoMdCheckmarkCircle 
                    className='text-orange-300 text-2xl outline outline-2 rounded-full relative z-10'/>
                    :
                    <span 
                    className={` border ${index==currentMenu?"":"dark:border-secondary-veryDark border-neutral-200 "} border-secondary-dark dark:border-secondary outline outline-4 outline-secondary dark:outline-primary dark:bg-primary  rounded-full p-3 flex   h-4 w-4 items-center justify-center`}>{index+1}</span>
                    }
                  </div>
                  <span className=''>{item.label}</span>
                </div>
                  {/* {menuItems.length!==index+1&&<span className='h-[0.5px] w-16 dark:bg-secondary mt-4 mx-1'></span>} */}
              </div>
            </div>
          ))}
        </div>
  )
}

export default StepProgess