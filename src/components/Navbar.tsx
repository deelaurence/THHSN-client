import React, { useEffect, useState } from 'react';
import { RiLogoutCircleFill } from "react-icons/ri";
import { HiLogout } from "react-icons/hi";
import { RootState, AppDispatch } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAdmin } from '../store/adminSlice';
import { Link } from 'react-router-dom';
import { Sdk } from '../utils/sdk';
import { IoMenuOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';
import { BsHandbag } from 'react-icons/bs';
import ThemeToggleButton from './ThemeToggleButton';
import { MdArrowOutward } from "react-icons/md";
const sdk = new Sdk();

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility
  const [timeoutId, setTimeoutId]= useState(0);
  const adminObject = useSelector((state: RootState) => state.admin.admin);

  const dispatch = useDispatch<AppDispatch>();

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    const time=setTimeout(() => {
      setIsMenuOpen(!isMenuOpen);
    }, 500);

    setTimeoutId(time)

  };

  useEffect(()=>{
    return()=>{
      if(timeoutId){
        clearTimeout(timeoutId);
      }
    }
  },[timeoutId])

  // Handle admin logout
  const handleAdminLogout = () => {
    dispatch(signOutAdmin());
  };

  return (
    <div className='relative pb-12 z-100 force-z'>
      {/* Main Navbar */}
      <div className='px-6 pb-4 border-b fixed w-full bg-secondary border-b-primary dark:border-b-neutral-700 justify-between dark:bg-primary flex items-center py-2 dark:text-secondary'>
        <div className='flex items-center gap-3'>
          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className='focus:outline-none md:hidden'>
            <IoMenuOutline className='text-2xl' />
          </button>
          <h1 className='font-bold'>Logo</h1>
        </div>

          <div className='flex items-center gap-3'>
            <CiUser className='dark:text-xl text-2xl' />
            <BsHandbag className='dark:text-lg text-xl' />
        </div>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-4'>
          {adminObject && (
            <div onClick={handleAdminLogout} className='cursor-pointer'>
              Logout
            </div>
          )}
          <Link to={sdk.adminDashboardRoute} className='hover:text-gray-500'>
            Dashboard
          </Link>
          <ThemeToggleButton />
          <div className='flex items-center gap-2'>
            <CiUser className='dark:text-xl text-2xl' />
            <BsHandbag className='dark:text-lg text-xl' />
          </div>
        </div>
      </div>

      {/* Mobile Slide-In Menu */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-black opacity-50'
          onClick={toggleMenu}
        ></div>
      )}




    {/* mobile hamburger menu section */}




      <div
        className={`fixed top-0 left-0 w-screen h-full bg-secondary dark:bg-primary text-white transition-transform transform z-50 ${
          isMenuOpen ? 'translate-x-0 z-100' : '-translate-x-full'
        } md:hidden`}
        onClick={toggleMenu}
      >
        <div className='flex flex-col space-y-4'>
          {/* Close Button */}
          <div
            className='px-6 self-end items-center flex justify-between gap-2 w-full text-right border-b border-primary dark:border-neutral-800 p-3 focus:outline-none text-primary dark:text-secondary'
          >
           <p className="font-medium">Because its about beauty</p>
           <ThemeToggleButton />
           {adminObject && (
            <div onClick={handleAdminLogout} className='cursor-pointer dark:text-secondary text-primary flex gap-1 items-center text-xs'>
              Logout <RiLogoutCircleFill />
            </div>
          )}
            <button onClick={toggleMenu} >✕</button>

          </div>
          
          {/* Menu Items */}
          

          {/* Hamburger mobile menu content */}

          {sdk.navbarData.map((menu,index)=>{
            return(
              <div 
              key={index}
              className='text-primary dark:border-neutral-600  px-6 border-b border-primary dark:text-secondary'>
                <Link
                  to={menu.link}
                  className='uppercase'
                  onClick={toggleMenu}
                  >
                  {menu.label}
                </Link>
                {menu.imgUrl&&                  
                  <div className='flex  justify-between mb-2'>
                    <div className='flex  flex-col justify-around'>
                      <p className='text-xl font-bold'>{menu.header}</p>
                      <p className='text-xs flex items-end gap-1'>{menu.catchPhrase} <MdArrowOutward/></p>
                    </div>
                    <div className='h-24 w-32 border border-black '>
                      <img src={menu.imgUrl} alt={menu.label} className='w-full h-full object-cover ' />
                    </div>
                  </div>
                }
              </div>
            )
          })
            
          }
          {/* <ThemeToggleButton />
          <div className='flex items-center gap-2'>
            <CiUser className='dark:text-xl text-2xl' />
            <BsHandbag className='dark:text-lg text-xl' />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
