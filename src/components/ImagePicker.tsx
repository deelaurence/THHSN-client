import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store.ts';
import { bestsellerAndNewArrivalCoverimage } from '../store/adminSlice.ts';
import Loader from './Loader.tsx';
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
    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        onPick(image);
        dispatch(bestsellerAndNewArrivalCoverimage({coverImage:image}))
    };
    
    
    return (
        <section>
        {popupOpen&&
        <div className="h-screen w-screen p-6 pt-16 fixed top-0 bg-black left-0 z-[9999999999999999] flex-wrap gap-4">
        {adminStatus=='loading'?
        <div className='h-4/5 flex items-center justify-center'><Loader/></div>
        :<div className='flex flex-wrap gap-4'>
        <p onClick={()=>{setPopupOpen(false)}} className='absolute top-6 right-6 text-3xl text-secondary font-bold'>Back</p>    
        {images.map((image, index) => (
                <div
                    key={index}
                    className={`cursor-pointer p-2 border-2 h-fit ${selectedImage === image ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => handleImageClick(image)}
                >
                    <img src={image} alt={`Image ${index}`} className="w-32 h-32 object-cover" />
                </div>
            ))}
        </div>}
        </div>}
        <div onClick={()=>{setPopupOpen(true)}}>
            Select
        </div>
        </section>
    );
};

export default ImagePicker;