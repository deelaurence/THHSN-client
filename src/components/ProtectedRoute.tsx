import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { Sdk } from "../utils/sdk";
const sdk = new Sdk();
export const AdminPrivateRoutes = () => {
    
    const adminObject = useSelector((state: RootState) =>{
        return state.admin.admin
    }) 
    return adminObject?.token? 
    <>
    
    <Outlet /> 
    </>
    : <Navigate to={sdk.adminLoginRoute} />;
};
export const UserPrivateRoutes = () => {
    
    const userObject = useSelector((state: RootState) =>{
        return state.user.user
    }) 
    return userObject?.token? 
    <>
    
    <Outlet /> 
    </>
    : <Navigate to={sdk.userLoginRoute} />;
};
