import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from "../store/store";
import { Sdk } from "../utils/sdk";
const sdk = new Sdk();
const AdminPrivateRoutes = () => {

    const adminObject = useSelector((state: RootState) =>{
        return state.admin.admin
    }) 
    return adminObject?.token ? <Outlet /> : <Navigate to={sdk.adminLoginRoute} />;
};
export default AdminPrivateRoutes;