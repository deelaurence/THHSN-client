// src/components/ForgotPassword.tsx
import React, { useEffect, useState } from 'react';
import { forgotPassword } from '../../store/userSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import FormInput from '../../components/FormInput.tsx';
import Button from '../../components/Button.tsx'
import { SlInfo } from 'react-icons/sl';
import PageHeader from '../../components/PageHeader.tsx';
import { useNavigate } from 'react-router-dom';
import { sdk } from '../../utils/sdk.ts';
const ForgotPassword: React.FC = () => {


  const [email, setEmail] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);
  const userFormErrors = useSelector((state: RootState) => state.user.formErrors);
  const navigate = useNavigate()
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({email}))
    .unwrap()  
    .then(() => {
      navigate(sdk.emailSentRoute); 
    })
  };



  useEffect(()=>{

    const errorElements = document.querySelectorAll('.input-errors')
    console.log(errorElements)
    setDisableSubmit(userFormErrors[userFormErrors.length-1]!=='')
    
  },[userFormErrors])

  console.log(userFormErrors[userFormErrors.length-1]!=='')
  const handleEmailChange = (e:any)=>{
    setEmail(e.target.value)
  }
 

  return (
    <div className="flex px-6 flex-col items-center justify-center h-screen dark:bg-primary dark:text-secondary">
      <PageHeader heading='' accent='Forgot Password'/>
      <div className='flex gap-1 text-xs mb-4 opacity-60 -mt-12'>
            <p>Enter the email you registered with.</p>
        </div>
      <form
        className="w-full pt-6 pb-8 mb-4"
        onSubmit={handleSignIn}
      >
        <FormInput type='email' placeholder='Email' value={email} required={true} onChange={handleEmailChange} />
        <div className="mt-8 flex flex-col gap-6 justify-between">
          <Button extraClass='capitalize  border-none py-1 font-thin bg-primary text-secondary' disabled={disableSubmit||userStatus==="loading"} size="large" label="Continue" loading={userStatus==='loading'} />
        </div>

        
      </form>
      {userStatus === 'failed' && (
        <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {userError}</p>
      )}
    </div>
  );
};

export default ForgotPassword;
