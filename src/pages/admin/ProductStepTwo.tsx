import React, { useState } from 'react';
import CategoryHeader from '../../components/CategoryHeader';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { SlInfo } from 'react-icons/sl';
import ImageInput from '../../components/ImageInput.tsx';
import { addProductImage } from '../../store/adminSlice.ts';
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

interface Product {
    name: string;
    category: string;
    price: number|string;
    quantity: number|string;
    description: string;
    images: File[];
  }

const ProductStepTwo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const adminStatus = useSelector((state:RootState)=>{
    return state.admin.status
  })
  const adminError = useSelector((state:RootState)=>{
    return state.admin.error
  })
  const [images, setImages] = useState<any>();
  
  // Handle product data changes
  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setImages(Array.from(files)); // Convert FileList to an array
    }
  };
  

  
  // Handle adding product to the list
  const handleUpload = (e:React.FormEvent) => {
    e.preventDefault();
    dispatch(addProductImage(images))
  };

  return (
    <div className='min-h-screen pb-12'>
      
        <form 
        onSubmit={handleUpload}
        >
        {/* category for name and description */}
        
        <CategoryHeader heading='Make It Catchy!' subheading='Help Customers Understand Your Product at a Glance'/>
        <ImageInput required={true} type='file' placeholder='image' multiple={true}  onChange={handleFileChange}/>
        <Button disabled={adminStatus==="loading"} size="large" label="continue" loading={adminStatus==='loading'} />
          </form>
        {adminStatus === 'failed' && (
            <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {adminError}</p>
        )}
    
    </div>
  );
};




export default ProductStepTwo