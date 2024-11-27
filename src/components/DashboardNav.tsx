import React, { useState } from 'react'
import { Link } from 'react-router-dom'



interface IMenu{
    label:string;
    route?:string;
    icon?:JSX.Element;
    component?:JSX.Element;
}

interface IMenuProps{
    menuItems:IMenu[]
}

/**
 * This either navigates to a new page or displays a new component on the same page depending on the content of the 
 * array supplied as argument.
 * Components or Route
 * @param menuItems
 * @returns 
 */


const DashboardNav:React.FC<IMenuProps>= ({menuItems}) => {
    const [currentIndex, setCurrentIndex]=useState(0)
  
    return (
    <>
    <div className="flex gap-4 flex-wrap *:flex *:gap-1 *:items-center  *:w-fit">
        {/* Map through the menu items */}
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.route||''}

            className={` dark:bg-primary-light bg-neutral-200 p-3  ${currentIndex===index?'border-b-2 dark:border-b-neutral-400 border-b-neutral-700':'dark:border-b-neutral-500'} border-b flex   items-center text-sm gap-2`}
            onClick={() => setCurrentIndex(index)}>
            {item.icon}
            <span className="text-xs capitalize">{item.label}</span>
          </Link>
        ))}
      </div>
      {/* if component is supplied switch based on the current index */}
      {menuItems[currentIndex]?.component&&
      <div>
          {menuItems[currentIndex].component}
      </div>
      }
</>  
)
}

export default DashboardNav