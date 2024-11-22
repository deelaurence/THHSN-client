import React, { useState } from 'react';
import CategoryHeader from '../../components/CategoryHeader';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { SlInfo } from 'react-icons/sl';
import { addProductNameAndPrice } from '../../store/adminSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { FaBagShopping } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import {IoMdCheckmarkCircle}  from 'react-icons/io'
import PageHeader from '../../components/PageHeader'
import {Sdk} from '../../utils/sdk'
import Analytics from "./Analytics";
import Payments from "./Payments";
const sdk = new Sdk();
import { RootState, AppDispatch } from '../../store/store.ts';

interface ProductDraftOne {
    name: string;
    category: string;
    description: string;
    images: File[];
  }

export const ProductStepOne = () => {
  const dispatch = useDispatch<AppDispatch>()
  const adminStatus = useSelector((state:RootState)=>{
    return state.admin.status
  })
  const adminError = useSelector((state:RootState)=>{
    return state.admin.error
  })
  const [currentMenu, setCurrentMenu] = useState<number >(0);
  const [productData, setProductData] = useState<ProductDraftOne>({
    name: 'a',
    category:'d',
    description: 'e',
    images: [],
  });
  
  // Handle product data changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle adding product to the list
  const handleSubmitDraft = (e:React.FormEvent) => {
    e.preventDefault();
    dispatch(addProductNameAndPrice(productData))
  };

  return (
    <div className='min-h-screen'>
      
        <form 
        onSubmit={handleSubmitDraft}
        >
          {/* category for name and description */}
          <CategoryHeader heading='Make It Catchy!' subheading='Help Customers Understand Your Product at a Glance'/>
          <FormInput type='text' placeholder='Product name' value={productData.name} required={true} onChange={handleInputChange} name='name' />
          <FormInput
            type="select"
            placeholder="Category"
            value={productData.category}
            required={true}
            onChange={(e) => setProductData({...productData,category: e.target.value})}
            selectOptions={[
              { label: 'Electronics', value: 'electronics' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Books', value: 'books' },
            ]}
          />
          <FormInput type='textarea' placeholder='Description' value={productData.description} required={true} onChange={handleInputChange} name='description' fieldTip='Tell Us What Makes This Product Special' />
            

          
          <Button disabled={adminStatus==="loading"} size="large" label="continue" loading={adminStatus==='loading'} />
      </form>
      {adminStatus === 'loading' && <p className="text-gray-500">Loading...</p>}
      {adminStatus === 'failed' && (
        <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {adminError}</p>
      )}
    
    </div>
  );
};




