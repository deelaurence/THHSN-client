// src/components/UserLogin.tsx
import React, { useEffect, useState } from 'react';
import { googleSignIn, signInUser } from '../../store/userSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import FormInput from '../../components/FormInput.tsx';
import Button from '../../components/Button.tsx'
import { SlInfo } from 'react-icons/sl';
import { Sdk } from '../../utils/sdk.ts';
import PageHeader from '../../components/PageHeader.tsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
const sdk = new Sdk()
const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);
  const userFormErrors = useSelector((state: RootState) => state.user.formErrors);
  const navigate = useNavigate()
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInUser({email,password})).then((result: any) => {
          console.log(result)
          if (result.meta.requestStatus === 'fulfilled') {
            navigate(sdk.cartRoute)
          }
          if(result.error?.message==='Email not registered, Sign up'){
            navigate(sdk.userRegistrationRoute)
          }

        });
  };

  const {getUserObject,cartRoute}= new Sdk()


  //Redirect to user dashboard if still logged in
  useEffect(()=>{
    if(getUserObject()?.token){
      navigate(cartRoute)
    }
  },[])


  useEffect(()=>{

    const errorElements = document.querySelectorAll('.input-errors')
    console.log(errorElements)
    setDisableSubmit(userFormErrors[userFormErrors.length-1]!=='')
    
  },[userFormErrors])

  console.log(userFormErrors[userFormErrors.length-1]!=='')
  const handleEmailChange = (e:any)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e:any)=>{
    setPassword(e.target.value)
  }

  return (
    <div className="flex px-6 flex-col items-center justify-center h-screen dark:bg-primary dark:text-secondary">
      <PageHeader heading='' accent='Login to your account'/>
      <div className='flex gap-1 text-xs mb-4 opacity-60 -mt-12'>
            <p >Don't have an account?</p>
            <Link className='text-yellow-600' to={sdk.userRegistrationRoute}>
                Register 
            </Link>
        </div>
      <form
        className="w-full pt-6 pb-8 mb-4"
        onSubmit={handleSignIn}
      >
        <FormInput type='email' placeholder='Email' value={email} required={true} onChange={handleEmailChange} />
        <FormInput type='password' placeholder='Password' value={password} required={true} onChange={handlePasswordChange} />
        <div className="mt-8 flex flex-col gap-6 justify-between">
          <Button extraClass='capitalize  border-none py-1 font-thin bg-primary text-secondary' disabled={disableSubmit||userStatus==="loading"} size="large" label="Sign In" loading={userStatus==='loading'} />
          
          <div
          onClick={()=>{
            dispatch(googleSignIn())
          }}
          className='border gap-4  text-xl justify-center bg-[#fff] dark:bg-primary-light dark:border-none border-neutral-600 flex items-center p-2 w-full  '>
            <p className='text-base opacity-80'>Continue with Google</p>
            <FcGoogle/>
          </div>

          <div className='flex gap-1  text-xs mb-4 opacity-60'>
            <Link className='' to={sdk.forgotPasswordRoute}>
                Forgot your password? Click here to reset credentials.
            </Link>
        </div>
        </div>

        
      </form>
      {userStatus === 'failed' && (
        <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {userError}</p>
      )}
    </div>
  );
};

export default UserLogin;
