import { sdk } from "../utils/sdk.ts";


interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <div className='sm:flex items-stretch sm:min-h-screen sm:*:flex-[1] sm:border-y md:gap-12 justify-between sm:dark:border-neutral-800 border-dashed md:mx-44 tablet:mx-0 sm:mt-12 tablet:border-none'>
    <div className=' relative hidden tablet:hidden sm:block flex-[1]'>
      <img className='h-full w-full object-cover' src={sdk.authScreenPicture} alt="" />
      <div className='absolute top-0 h-full opacity-50 w-full z-10 bg-primary'></div>
      <h3 className='absolute text-6xl top-1/2 left-1/2 -translate-x-1/2 text-secondary font-queens -translate-y-1/2'> <span className='adelia'>Style</span>  like no other</h3>
    </div>
    {children}
    </div>
  ); 
};

export default AuthWrapper;
