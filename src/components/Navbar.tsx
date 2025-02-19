import { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { RootState, AppDispatch } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Sdk } from '../utils/sdk';
import { IoMenuOutline } from 'react-icons/io5';
import { BsArrowRight} from 'react-icons/bs';
import ThemeToggleButton from './ThemeToggleButton';
import { PiBag } from 'react-icons/pi';
import { useTheme } from '../contexts/AppContext';
import { IoIosArrowDown } from 'react-icons/io';
import { signOutUser } from '../store/userSlice';

const sdk = new Sdk();

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility
  const [timeoutId, setTimeoutId]= useState(0);
  // const adminObject = useSelector((state: RootState) => state.admin.admin);
  const userObject = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate()
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false); // State for dropdown visibility
  const [loginOrLogoutText, setLoginOrLogoutText] = useState("Login")
  const {cartItems,isAdmin,toggleCurrency,isDollar}=useTheme()
  const dispatch = useDispatch<AppDispatch>();

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    const time=setTimeout(() => {
      setIsMenuOpen(!isMenuOpen);
    }, 500);
    //@ts-ignore
    setTimeoutId(time)

  };

  

  const handleCurrencyToggle = (currency: string) => {
    if(currency==="USD"){
      toggleCurrency(true)
      sdk.setIsDollarPersisted("true")
    }
    else{
      sdk.setIsDollarPersisted("false")
      toggleCurrency(false)
    }
    setIsCurrencyDropdownOpen(false); // Close the dropdown after selection
  };
  
  useEffect(()=>{
    return()=>{
      if(timeoutId){
        clearTimeout(timeoutId);
      }
    }
  },[timeoutId])

  useEffect(()=>{
    if(sdk.getUserObject()){
      setLoginOrLogoutText("Logout")
    }
    else{
      setLoginOrLogoutText("Login")
    }
  },[sdk.getUserObject()])


  const handleUserLogout = ()=>{
    dispatch(signOutUser())
  }


  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  const CurrencyPair=()=>{
      return(
        <div className='relative  font-queens no-fade  border-black p-0 '>
            <button
              className='flex  text-sm no-fade opacity-80 gap-[2px] items-center cursor-pointer'
              onClick={() => setIsCurrencyDropdownOpen((prev) => !prev)}
            >
              {/* {isDollar?<img src={sdk.usaFlagIcon} className='h-3  no-fade grayscale-[40%]'/>:
              <img src={sdk.nigeriaFlagIcon} className='h-3 no-fade grayscale-[40%]'/>} */}
              <span className='p-0 no-fade text-sm m-0 ml-[2px] '>{isDollar ? 'USD' : 'NGN'}</span>
              <IoIosArrowDown className='no-fade text-xs' />
            </button>

            {isCurrencyDropdownOpen && (
              <div className='text-xs no-fade absolute w-32  right-0 bg-secondary dark:bg-primary-light shadow-lg rounded-md mt-2 '>
                <button
                  className='flex no-fade border-b dark:border-b-neutral-700 items-center  gap-2  p-2 '
                  onClick={() => handleCurrencyToggle('NGN')}
                >
                  <img src={sdk.nigeriaFlagIcon} className='h-4'/>
                  <p className=' whitespace-nowrap'>NGN &mdash; Naira</p>
                </button>
                <button
                  className='flex no-fade items-center gap-2  p-2'
                  onClick={() => handleCurrencyToggle('USD')}
                >
                  <img src={sdk.usaFlagIcon} className='h-4'/>
                  <p className=''>USD &mdash; Dollars</p>
                </button>
              </div>
            )}
          </div>)
  }



  return (
    <div className={`relative  pb-12 z-100 force-z`}>
      {/* Main Navbar */}
      {/* <div className={`${scrolled?'bg-secondary dark:bg-primary':'bg-secondary dark:bg-primary'} px-6 tablet:px-16 sm:px-16 py-4 sm:py-8 border-b  border-b-primary fixed w-full   dark:border-b-neutral-500 justify-between flex items-center  dark:text-secondary`}> */}
      <div className={`bg-secondary dark:bg-primary  px-6 tablet:px-16 sm:px-16 py-4  border-b  border-b-primary fixed w-full   dark:border-b-neutral-500 justify-between flex items-center  dark:text-secondary`}>
        <div className='flex items-center gap-3'>
          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className='focus:outline-none md:hidden'>
            <IoMenuOutline className='text-2xl' />
          </button>
          {/* <Link to='/' className='font-bold cinzel-decorative text-sm'>The human hair shop NG </Link> */}
          <Link to='/' className='font-bold cinzel-decorative text-sm'>THE human hair shop</Link>
        </div>
        





        <div className='flex no-fade  items-center opacity-90 gap-4'>
            <CurrencyPair/>
            {/* <FiUser className='text-[1.5rem] ' /> */}
            {/* <PiUserBold className=' text-[1.5rem]'/> */}
            <div className='relative'>
              <Link to={sdk.cartRoute}>
                <PiBag className='text-[1.5rem]'/>
              </Link>
              <p className='absolute bg-yellow-600 rounded-full h-3 w-3 text-white flex items-center justify-center text-[7px] p-1 top-0 -right-1'>{cartItems}</p>
            </div>
            {/* <BsHandbag className=' text-[1.4rem]' /> */}
        </div>

        


        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-4'>
          
          
          
          <Link to={sdk.userDashboard} className='hover:text-gray-500'>
            Dashboard
          </Link>
          <ThemeToggleButton />
          
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
      >
        <div className='flex flex-col '>
          {/* Close Button */}
          <div
            className='px-6 bg-primar self-end items-center flex justify-between gap-2 w-full text-right border-b border-primary dark:border-neutral-700 p-3 focus:outline-none text-primary dark:text-secondary'
          >
           <p className="font-medium">Because its about beauty</p>
           <ThemeToggleButton/>
           {/* {adminObject && (
            <div onClick={handleAdminLogout} className='cursor-pointer dark:text-red-400  flex gap-1 items-center text-2xl'>
               <RiLogoutCircleFill />
            </div>
          )} */}
            <button className='text-3xl' onClick={toggleMenu} >

              <IoCloseOutline/>
            </button>

          </div>
          
          {/* Menu Items */}
          

          {/* Hamburger mobile menu content */}

          {sdk.navbarData.map((menu,index)=>{
            return(
                <div 
                key={index}
                className='text-primary dark:border-neutral-600 px-6 py-3 border-b border-primary  dark:text-secondary'>
                {(!menu.superUser || isAdmin) && (
                <Link
                  to={menu.link}
                  className='uppercase'
                  onClick={
                    ()=>{
                      setIsMenuOpen(false);
                      if(menu.label==='Logout'||menu.label==="Login"){
                        handleUserLogout();
                        navigate(sdk.userLoginRoute);
                      }
                      if(menu.label=='Dashboard')
                        toggleMenu()
                      }
                    }
                >
                  {menu.label.startsWith("Log")?loginOrLogoutText:menu.label}
                </Link>
                )}
                {menu.imgUrl &&                  
                <div className='flex justify-between mb-2'>
                  <div className='flex flex-col justify-around'>
                  <p className='text-xl font-bold font-queens'>{menu.header}</p>
                  <p className='text-xs flex items-center gap-1'>{menu.catchPhrase} <BsArrowRight className='text-sm mt-[2px]'/></p>
                  </div>
                  <div className='h-24 w-32 border border-black'>
                  <img src={menu.imgUrl} alt={menu.label} className='w-full h-full object-cover' />
                  </div>
                </div>
                }
                {/* {adminObject && (
            <div onClick={handleAdminLogout} className='cursor-pointer'>
              Logout
            </div>
          )} */}
                </div>
            )
          })
          
            
          }
        
        </div>
      </div>
    </div>
  );
};

export default Navbar;
