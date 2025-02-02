import React, { useEffect, useState } from 'react';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { SlInfo } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import { fetchExchangeRate } from '../../store/fetchProductSlice.ts';
import { updateExchangeRate } from '../../store/adminSlice.ts';
import PageHeader from '../../components/PageHeader.tsx';
import { sdk } from '../../utils/sdk.ts';
// import { addProductVariation,setEditProductMode } from '../../store/adminSlice.ts';
// import { Sdk } from '../../utils/sdk.ts';
// import { useNavigate } from 'react-router-dom';
// const sdk = new Sdk()



const ExchangeRate = () => {
    const dispatch = useDispatch<AppDispatch>()
    const adminStatus = useSelector((state:RootState)=>{
        return state.admin.status
    })

    const adminError = useSelector((state:RootState)=>{
        return state.admin.error
    })


    const exchangeRate = useSelector((state:RootState)=>{
      return state.product.exchangeRate
    })
    const [rate, setRate]=useState(exchangeRate);
    // Handle adding product to the list

    
    const handleSubmitRate = (e:React.FormEvent) => {
        e.preventDefault();
        dispatch(updateExchangeRate({
            rate,
            currencyPair:"Dollar To Naira"
        }))
        // dispatch(addProductVariation(rate))
    // 
    };
    useEffect(()=>{
        dispatch(fetchExchangeRate())
        setRate(exchangeRate)
    },[dispatch])

  


    return (
        <div className='min-h-screen pb-4 px-6 sm-px-16'>        
            <form 
            onSubmit={handleSubmitRate}
            >
            {/* Input Variation details */}
            <PageHeader heading='' accent='Update Exchange Rate!' backToLabel='Dashboard' backToRoute={sdk.adminDashboardRoute} />
            <FormInput onChange={(e)=>{setRate(Number(e.target.value))}} type='number' placeholder='Rate' value={rate||''} required={true} name='description' fieldTip={`How much is a dollar now in naira?`} />
            
            
            <Button 
                // onClick={}
                extraClass='bg-primary text-secondary'
                disabled={adminStatus==="loading"} size="large" label="continue" loading={adminStatus==='loading'} />
        </form>
        {adminStatus === 'failed' && (
            <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {adminError}</p>
        )}
        </div>
    );
};




export default ExchangeRate