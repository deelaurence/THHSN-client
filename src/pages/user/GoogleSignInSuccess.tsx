import { useLocation, useNavigate } from 'react-router-dom';
import { sdk } from '../../utils/sdk';
import { useEffect } from 'react';
import { setUserAfterGoogleAuth } from '../../store/userSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
const GoogleSignInSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch:AppDispatch = useDispatch()
    const queryParams = new URLSearchParams(location.search);
    const payload = queryParams.get('payload');
    const email = queryParams.get('email');
    const name = queryParams.get('firstName')||queryParams.get('name')?.split(" ")[0];
    const lastName = queryParams.get('lastName');
    const address = queryParams.get('address')
    const phonenumber = queryParams.get('phonenumber')
    if(payload&&email){
        sdk.setUserObject({
            token:payload,
            email,
            address: address ?address:undefined,
            phonenumber:phonenumber?parseInt(phonenumber):undefined,
            lastName: lastName?lastName:"",
            firstName: name?name:"",
        })
    }
    useEffect(()=>{
        dispatch(setUserAfterGoogleAuth())
        navigate(sdk.cartRoute)
    })
    return (null);
};

export default GoogleSignInSuccess;