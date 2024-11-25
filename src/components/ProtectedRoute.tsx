import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from "../store/store";
import { Sdk } from "../utils/sdk";
import { BiArrowFromRight } from "react-icons/bi";
const sdk = new Sdk();
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
const AdminPrivateRoutes = () => {
    
    const adminObject = useSelector((state: RootState) =>{
        return state.admin.admin
    }) 
    return adminObject?.token ? 
    <>
    
    <Outlet /> 
    </>
    : <Navigate to={sdk.adminLoginRoute} />;
};
export default AdminPrivateRoutes;