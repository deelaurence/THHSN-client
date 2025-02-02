import React, { useState } from 'react';
import CategoryHeader from '../../components/CategoryHeader';
import Button from '../../components/Button';
import { SlInfo } from 'react-icons/sl';
import ImageInput from '../../components/ImageInput.tsx';
import { addProductImage, jumpToProductPage } from '../../store/adminSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import { CancelProductEditProgress } from './snippets/CancelProductEditProgress.tsx';

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
    if(!images){
      return dispatch(jumpToProductPage(2))
    }
    dispatch(addProductImage(images))
  };

  return (
    <div className='min-h-screen pb-12'>
        <form 
        onSubmit={handleUpload}
        >
        {/* category for name and description */}
        
        <CategoryHeader heading='Adding some fierce new looks!' subheading='You can upload upto five images right now.'/>
        
        <CancelProductEditProgress/>
        <ImageInput required={false} type='file' placeholder='image' multiple={true}  onChange={handleFileChange}/>
        <Button extraClass='bg-primary text-secondary' disabled={adminStatus==="loading"} size="large" label="continue" loading={adminStatus==='loading'} />
          </form>
        {adminStatus === 'failed' && (
            <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {adminError}</p>
        )}
    
    </div>
  );
};




export default ProductStepTwo