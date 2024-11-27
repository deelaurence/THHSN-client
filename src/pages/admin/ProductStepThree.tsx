import React, { useEffect, useState } from 'react';
import CategoryHeader from '../../components/CategoryHeader';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { SlInfo } from 'react-icons/sl';
import { IoAddCircle } from 'react-icons/io5';
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneTags } from "react-icons/ai";
import { RootState, AppDispatch } from '../../store/store.ts';
import { addProductVariation,setEditProductMode } from '../../store/adminSlice.ts';
import { Sdk } from '../../utils/sdk.ts';
import { useNavigate } from 'react-router-dom';
const sdk = new Sdk()
interface Variants{
  name:string,
  variations:{variation:string,price:number,quantity:number}[]
}

const ProductStepThree = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const adminStatus = useSelector((state:RootState)=>{
    return state.admin.status
  })
  const editingProduct = useSelector((state:RootState)=>{
    return state.admin.editingProduct
  })
  const adminError = useSelector((state:RootState)=>{
    return state.admin.error
  })
  
  const [variants, setVariants]=useState<Variants[]>(editingProduct?sdk.getSingleProductDetail().variations:[]);
  const [variantHeader, setVariantHeader]=useState<string>('')
  const [variantChildren, setVariantChildren]=useState<string>('')
  const [variantPrice, setVariantPrice]=useState<number>(0)
  const [variantQuantity, setVariantQuantity]=useState<number>(0)
  const [disablePushButton,setDisablePushButton]=useState<boolean>(true)
  // Handle adding product to the list
  const handleSubmitVariation = (e:React.FormEvent) => {
    e.preventDefault();
    dispatch(addProductVariation(variants))
    if(editingProduct){
      navigate(sdk.manageInventoryRoute)
      dispatch(setEditProductMode(false))
    }
  };

  const handleChange=(e:any)=>{
    setVariantChildren(e.target.value)
  }
  const handlePriceChange=(e:any)=>{
    setVariantPrice(Number(e.target.value))
  }
  const handleQuantityChange=(e:any)=>{
    setVariantQuantity(Number(e.target.value))
  }

  const handleRemoveVariant = (indexA: number, indexB: number) => {
    // Make a shallow copy of the variants array
    let updatedVariants = [...variants];
    
    // Remove the selected variation from the specified variant
    updatedVariants[indexA] = {
      ...updatedVariants[indexA],
      variations: updatedVariants[indexA].variations.filter((_, idx) => idx !== indexB)
    };
    updatedVariants = updatedVariants.filter((variant) => variant.variations.length > 0);

    // Update the state with the modified variants array
    setVariants(updatedVariants);
  };
  
  
  useEffect(()=>{
    if(variantHeader&&variantChildren&&variantPrice&&variantQuantity){
      setDisablePushButton(false)
    }
  },[!variantHeader,variantChildren,variantPrice,variantQuantity])


  const pushVariant = () => {

    if(!variantHeader||!variantChildren||!variantPrice||!variantQuantity){
      return
    }
    const existingHeaders = variants.map((variant) => variant.name);
    
    if (existingHeaders.includes(variantHeader)) {
      // Find and update existing variant
      const updatedVariants = variants.map((variant) => {
        if (variant.name === variantHeader) {
          return {
            ...variant,
            variations: [
              ...variant.variations,
              { variation: variantChildren, price: variantPrice, quantity:variantQuantity }
            ]
          };
        }
        return variant;
      });

      setVariants(updatedVariants);
    } else {
      // Add a new variant
      setVariants([
        ...variants,
        {
          name: variantHeader,
          variations: [{ variation: variantChildren, price: variantPrice, quantity:variantQuantity }]
        }
      ]);
    }

    // Clear input fields after adding
    setVariantChildren('');
    setVariantPrice(0);
    setVariantQuantity(0);
    setDisablePushButton(true)
  };
  




  return (
    <div className='min-h-screen pb-4'>
      
        
        <form 
        onSubmit={handleSubmitVariation}
        >
         {/* Input Variation details */}
          <CategoryHeader heading='Add variants!' subheading='Set variations of the product'/>
          <FormInput
            type="select"
            placeholder="Variant Title"
            value={variantHeader}
            required={false}
            fieldTip='Select variations category for the product'
            onChange={(e)=>{
              setVariantHeader(e.target.value)
            }}
         
            selectOptions={[
              { label: 'Length', value: 'length' },
              { label: 'Colour', value: 'colour' },
            ]}
          />
          <FormInput onChange={handleChange} type='text' placeholder='Description' value={variantChildren} required={false} name='description' fieldTip={variantHeader==='length'?'12 inches? 14 inches?':'Blonde. Gray. Whatever. '} />
          <FormInput onChange={handlePriceChange} type='number' placeholder='Price' value={variantPrice||''} required={false} name='description' fieldTip={`How much does this variant cost?`} />
          <FormInput onChange={handleQuantityChange} type='number' placeholder='Quantity' value={variantQuantity||''} required={false} name='quantity' fieldTip={`How much do you have in stock?`} />
          <IoAddCircle className={`${disablePushButton?'opacity-30':''}  text-7xl my-6`} onClick={pushVariant}/>
          
          
          {/* Variations Added displayed */}
          {variants.map((variant,indexA)=>(
            <div className=' mb-6 mt-12 flex flex-col gap-2 text-base font-bold' key={indexA}>
              <div className='flex opacity-80  gap-1 items-center gap'>
              <AiTwotoneTags />
              <h3 className=' '>{variant.name}</h3>
              </div>
              {variant.variations.map((variation,indexB)=>{
                return (
                <div className='text-xs rounded font-normal bg-neutral-200 dark:bg-primary-light p-2 flex justify-between' key={indexB}>
                    <p className='opacity-80 '>We have <span className='font-medium'>{variation.quantity}</span> pieces of  <span className='font-medium'>{variation.variation}</span> each costing #{variation.price}</p>
                  <IoCloseOutline
                  onClick={()=>{handleRemoveVariant(indexA,indexB)}}
                  className='justify-self-end text-sm  text-red-300'/>
                </div>
                  )})}  
                  </div>
                ))} 
              
              <div className='flex '>
           
            <Button 
            // onClick={}
            disabled={adminStatus==="loading"||variants.length===0} size="large" label="continue" loading={adminStatus==='loading'} />
          </div>
      </form>
      {adminStatus === 'failed' && (
        <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors"><SlInfo/> {adminError}</p>
      )}
    
    </div>
  );
};




export default ProductStepThree