// src/components/AdminLogin.tsx
import React, { useEffect, useState } from 'react';
import { signInAdmin } from '../../store/adminSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import FormInput from '../../components/FormInput.tsx';
import Button from '../../components/Button.tsx'
import { SlInfo } from 'react-icons/sl';
import { Sdk } from '../../utils/sdk.ts';
const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true)
  const dispatch = useDispatch<AppDispatch>();
  const adminStatus = useSelector((state: RootState) => state.admin.status);
  const adminError = useSelector((state: RootState) => state.admin.error);
  const adminFormErrors = useSelector((state: RootState) => state.admin.formErrors);
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInAdmin({email,password}));
  };

  const {getAdminObject,adminDashboardRoute}= new Sdk()


  //Redirect to admin dashboard if still logged in
  useEffect(()=>{
    if(getAdminObject()?.token){
      window.location.href=adminDashboardRoute
    }
  },[])


  useEffect(()=>{
    const errorElements = document.querySelectorAll('.input-errors')
    console.log(errorElements)
    setDisableSubmit(errorElements.length>0)
    
  },[adminFormErrors])

  const handleEmailChange = (e:any)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e:any)=>{
    setPassword(e.target.value)
  }

  return (
    <div className="flex px-6 flex-col items-center  w-full justify-center h-screen dark:bg-primary dark:text-secondary">
      <h2 className="text-2xl font-bold mb-6"><span className='text-orange-500'>Hi</span> Admin.</h2>
      <form
        className="w-full pt-6 pb-8 mb-4"
        onSubmit={handleSignIn}
      >
        <FormInput  type='email' placeholder='Email' value={email} required={true} onChange={handleEmailChange} />
        <FormInput  type='password' placeholder='Password' value={password} required={true} onChange={handlePasswordChange} />
        <div className="flex mt-8 items-center justify-between">
          
        <Button disabled={disableSubmit||adminStatus==="loading"} size="large" label="Sign In" loading={adminStatus==='loading'} />
        {/* <Button disabled={disableSubmit} variant="danger" size="large" label="Sign In"/> */}
        {/* <Button  label="Sign In"/> */}
        </div>
      </form>
      {adminStatus === 'failed' && (
        <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {adminError}</p>
      )}
    </div>
  );
};

export default AdminLogin;
