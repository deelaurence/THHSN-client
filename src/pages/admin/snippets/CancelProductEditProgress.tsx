import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store.ts';
import {jumpToProductPage } from '../../../store/adminSlice.ts';
import { Sdk } from '../../../utils/sdk.ts';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
const sdk = new Sdk()
        
export const CancelProductEditProgress = () => {
        const navigate = useNavigate()
        const dispatch = useDispatch<AppDispatch>()
        const adminProduct = useSelector((state:RootState)=>{
          return state.admin.productDraftOne
        })
        return (
            <div>
                <div 
                className='opacity-70 flex items-center'
                onClick={()=>{
                    dispatch(jumpToProductPage(0))
                    navigate(sdk.adminDashboardRoute)
                    }}>
                    <button className=" text-xl text-red-400" >
                                <IoCloseOutline/>
                    </button>  
                    <p className='text-xs'>
                        Stop Editing [{adminProduct?.name}]
                    </p>  
                </div>
            </div>
        )
}
