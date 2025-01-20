// src/components/UserLogin.tsx
import React, { useEffect, useState } from 'react';
import { googleSignIn, registerUser } from '../../store/userSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import FormInput from '../../components/FormInput.tsx';
import Button from '../../components/Button.tsx'
import { SlInfo } from 'react-icons/sl';
// import { Sdk } from '../../utils/sdk.ts';
import PageHeader from '../../components/PageHeader.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Sdk } from '../../utils/sdk.ts';
const sdk = new Sdk()

const UserRegistration: React.FC = () => {

  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);
  const userFormErrors = useSelector((state: RootState) => state.user.formErrors);
  const [passwordUnmatch,setPasswordUnmatch] = useState("")
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if(password!==password2){
        setPasswordUnmatch("Password does not match!")
        return
    }
    
    dispatch(registerUser({email,password,firstName,lastName}))
    .unwrap()  
      .then(() => {
        navigate(sdk.emailSentRoute); 
      })
  };

//   const {getUserObject}= new Sdk()


  //Redirect to user dashboard if still logged in
//   useEffect(()=>{
//     if(getUserObject()?.token){
//       window.location.href=userDashboardRoute
//     }
//   },[])


  useEffect(()=>{
    setDisableSubmit(userFormErrors[userFormErrors.length-1]!=='')
  },[userFormErrors])

  const handleEmailChange = (e:any)=>{
    setEmail(e.target.value)
  }
  const handleFirstNameChange = (e:any)=>{
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e:any)=>{
    setLastName(e.target.value)
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
      <PageHeader heading='' accent='Create Your Account.'/>
      <div className='flex gap-1 text-xs mb-4 opacity-60 -mt-12'>
            <p >Already have an account?</p>
            <Link className='text-yellow-600' to={sdk.userLoginRoute}>
                Login
            </Link>
        </div>
      <form
        className="w-full pt-6 pb-8 mb-4"
        onSubmit={handleRegister}
      >
        <FormInput type='email' placeholder='Email' value={email} required={true} onChange={handleEmailChange} />
        <FormInput type='text' placeholder='Last Name' value={lastName} required={true} onChange={handleLastNameChange} />
        <FormInput type='text' placeholder='First Name' value={firstName} required={true} onChange={handleFirstNameChange} />
        <FormInput type='password' placeholder='Password' value={password} required={true} onChange={handlePasswordChange} />
        <FormInput type='password' placeholder='Confirm Password' value={password2} fieldTip={passwordUnmatch??""} required={true} onChange={handlePasswordChange2} />
        <div className="mt-8 flex flex-col gap-6 justify-between">
          <Button extraClass='capitalize  border-none py-1 font-thin bg-primary text-secondary' disabled={disableSubmit||userStatus==="loading"} size="large" label="Sign Up" loading={userStatus==='loading'} />
          
          <div 
          onClick={()=>{
                dispatch(googleSignIn())
            }}
          className='border gap-4  text-xl justify-center bg-[#fff] dark:bg-primary-light dark:border-none border-neutral-600 flex items-center p-2 w-full  '>
            <p className='text-base opacity-80'>Continue with Google</p>
            <FcGoogle/>
          </div>

          <div className='flex gap-1  text-xs mb-4 opacity-60'>
            <Link className='' to={"/"}>
                Forgot your password? Click here to reset credentials.
            </Link>
          </div>
          {userStatus === 'failed' && (
                <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {userError}</p>
            )}
        </div>

        
      </form>
      
    </div>
  );
};

export default UserRegistration;
