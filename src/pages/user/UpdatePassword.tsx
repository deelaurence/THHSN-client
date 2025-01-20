// src/components/UpdatePassword.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import FormInput from '../../components/FormInput.tsx';
import Button from '../../components/Button.tsx'
import { SlInfo } from 'react-icons/sl';
import { Sdk } from '../../utils/sdk.ts';
import PageHeader from '../../components/PageHeader.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePassword } from '../../store/userSlice.ts';
const sdk = new Sdk()
const UpdatePassword: React.FC = () => {

  const location = useLocation()

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const emailFromParams = queryParams.get('email');
  const [email, setEmail] = useState(emailFromParams||"");
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);
  const userFormErrors = useSelector((state: RootState) => state.user.formErrors);
  const [passwordUnmatch,setPasswordUnmatch] = useState("")
  const navigate = useNavigate()
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if(password!==password2){
        setPasswordUnmatch("Password does not match!")
        return
    }
    dispatch(updatePassword({email,password}))
    .unwrap()  
        .then(() => {
          navigate(sdk.userLoginRoute); 
    })
  };

  useEffect(()=>{

    setDisableSubmit(userFormErrors[userFormErrors.length-1]!=='')
    console.log(userFormErrors)
  },[userFormErrors])

  const handleEmailChange = (e:any)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e:any)=>{
    setPassword(e.target.value)
  }
   const handlePasswordChange2 = (e:any)=>{
    setPassword2(e.target.value)
  }

  useEffect(()=>{
    if(password==password2){
        setPasswordUnmatch("")
    }
  },[password,password2])

  return (
    <div className="flex px-6 flex-col items-center justify-center h-screen dark:bg-primary dark:text-secondary">
      <PageHeader heading='' accent='Update Password'/>
      <div className='flex gap-1 text-xs mb-4 opacity-60 -mt-12'>
            <p>Enter Your New Password</p>
            
        </div>
      <form
        className="w-full pt-6 pb-8 mb-4"
        onSubmit={handleUpdatePassword}
      >
        <div className='opacity-70'>
            <FormInput type='email' disabled={true} placeholder='Email' value={email||""} required={true} onChange={handleEmailChange} />
        </div>
        <FormInput type='password' placeholder='Password' value={password} required={true} onChange={handlePasswordChange} />
        <FormInput type='password' placeholder='Confirm Password' value={password2} required={true} fieldTip={passwordUnmatch??""} onChange={handlePasswordChange2} />
        <div className="mt-8 flex flex-col gap-6 justify-between">
          <Button extraClass='capitalize  border-none py-1 font-thin bg-primary text-secondary' disabled={disableSubmit||userStatus==="loading"} size="large" label="Update Password" loading={userStatus==='loading'} />
          

        </div>

        
      </form>
      {userStatus === 'failed' && (
        <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {userError}</p>
      )}
    </div>
  );
};

export default UpdatePassword;
