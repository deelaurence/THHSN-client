import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store.ts';
import { bestsellerAndNewArrivalCoverimage } from '../store/adminSlice.ts';
import Loader from './Loader.tsx';
import { IoMdCheckmark } from "react-icons/io";
import leaf2 from '../assets/images/star-rectangle-12.png'
import leaf from '../assets/images/circle-half-stacked.png'
import {  BiUpload } from 'react-icons/bi';
// import leaf3 from '../assets/images/circle-4-star-X-shape-bloat.png'
// import leaf4 from '../assets/images/plant-5.png'
// import leaf5 from '../assets/images/blue_noise_med.png'
interface ImagePickerProps {
    images: string[];
    onPick: (image: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ images, onPick }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [popupOpen,setPopupOpen]=useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const adminStatus = useSelector((state:RootState)=>{
        return state.admin.status
    })
    const adminError = useSelector((state:RootState)=>{
        return state.admin.error
    })
    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        onPick(image);
        dispatch(bestsellerAndNewArrivalCoverimage({coverImage:image}))
    };
    
    
    return (
        <section className='relative'>
        {popupOpen&&
        
        <div 
        
        className={`h-screen w-screen p-6 pt-16 fixed gallery top-0 left-0 z-[9999999999999999] flex-wrap gap-4 overflow-auto`}>
        {adminStatus!=='loading'&&<div className='flex gap-4 items-center grayscale-[100%] justify-between py-16'>
            <img className=' opacity-50 w-44' src={leaf} alt="" />
            <img className=' opacity-50 grayscale-[100%] w-44 rotate-180' src={leaf2} alt="" />
            
            {/* <img className=' opacity-50 w-16' src={leaf3} alt="" />
            <img className=' opacity-50 w-12 rotate-180' src={leaf4} alt="" /> */}
        </div>}
        {adminStatus=='loading'?
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'><Loader/></div>
        :<div className=' flex justify-around sm:justify-start flex-wrap gap-4'>
        
        <h2 className='text-secondary opacity-50 sm:text-5xl font-queens mb-6 sm:my-16'>Choose Any of the pictures to be displayed as the cover image of the product.</h2>
        {adminError&&<p className='text-red-400 opacity-30 text-xs'>{adminError}</p>}
        <p onClick={()=>{setPopupOpen(false)}} className='absolute top-6 right-6 S text-secondary font-bold font-queens'>Go Back.</p>    
        {images.map((image, index) => (
                <div
                    key={index}
                    className={`cursor-pointer w-44 p-2 border relative h-fit ${selectedImage === image ? 'border-yellow-600' : 'border-transparent'}`}
                    onClick={() => handleImageClick(image)}
                >
                    <IoMdCheckmark className={`absolute  top-0 right-0 text-2xl ${selectedImage === image ? ' rounded-bl-xl text-sm p-[2px] bg-yellow-600 text-secondary' : 'text-transparent'}`} />
                    <img src={image} alt={`Image ${index}`} className="w-full h-44 object-cover" />
                </div>
            ))}
        </div>}
        </div>}
        <div className='flex items-center h-8 gap-2 my-6 border  border-primary w-fit  text-sm ' onClick={()=>{setPopupOpen(true)}}>
            <p className='px-4 py-1'>Choose Cover Image</p> 
            <div className='bg-primary flex items-center justify-center text-secondary w-8 h-full '>
                <BiUpload className=''/>
            </div>
        </div>
        </section>
    );
};

export default ImagePicker;