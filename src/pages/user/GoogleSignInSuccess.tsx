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
    const name = queryParams.get('name');
    if(payload&&email){
        sdk.setUserObject({
            token:payload,
            email,
            lastName: name ?? "",
            firstName: "",
        })
    }
    useEffect(()=>{
        dispatch(setUserAfterGoogleAuth())
        navigate(sdk.cartRoute)
    })
    return (null);
};

export default GoogleSignInSuccess;