import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import React from "react";// Define props type
import { IoCloseOutline } from "react-icons/io5";
import { sdk } from "../../utils/sdk";
import { IPayment } from "../../interfaces/paymentPayload";
import { AppDispatch,RootState } from "../../store/store";
import { useDispatch,useSelector } from "react-redux";
import { makePayment } from "../../store/userSlice";
import Loader from "../../components/Loader";
interface SelectMerchantProps {
  setShowMerchants: (value: boolean) => void;
  shippingDetails:IPayment
}


const SelectMerchant: React.FC<SelectMerchantProps> = ({ setShowMerchants,shippingDetails }) => {
    const [selected, setSelected] = useState("");
    const {status} = useSelector((state:RootState)=>{
        return state.user 
    }) 


    shippingDetails.merchant=selected
    const currentCart = sdk.getCart()
    console.log(currentCart)
    console.log(shippingDetails)
    const dispatch = useDispatch<AppDispatch>()
    const streamlinedCart=currentCart.map((cartItem:any)=>{
        return {
            price:cartItem.price,
            quantity:cartItem.quantity,
            name:cartItem.product.name,
            variant:cartItem.variant
        }
    })
    console.log(streamlinedCart)
    const proceedWithPayment =()=>{
        dispatch(makePayment({...shippingDetails,cart:streamlinedCart}))
    }

  return (
    <div className="fixed flex items-center justify-center top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[rgba(60,60,60,.5)]  z-[999999]">
      <div className="bg-white relative rounded-2xl p-6 pt-20  shadow-lg text-center w-80">
        <h2 className="text-2xl font-bold mb-10 font-queens">Select Payment Option</h2>

        <div className="flex flex-col space-y-3">
        {sdk.merchantsData.map((data,index)=>{
            return(
            <label 
            key={index}
            className={`${selected === data.name?'border-neutral-400':''} flex items-center space-x-3 border px-3 p-2 rounded-lg cursor-pointer`}>
            <input
              type="radio"
              name="payment"
              value={data.name}
              checked={selected === data.name}
              onChange={(e) => setSelected(e.target.value)}
              className="appearance-none w-3 h-3 border-2 border-gray-400 rounded-full checked:bg-gray-600 checked:ring-2 checked:ring-gray-700"
            />

            <img src={data.image} alt="Paystack" className="w-6 h-6" />
            <span className="text-lg capitalize">{data.name}</span>
            </label> 
            )
        })}
        </div>

        {/* Continue Button */}
        <div className="flex items-center justify-center mt-6 gap-2">
          <button
            onClick={proceedWithPayment}
            className={`uppercase w-full h-12 my-4 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition ${
              selected
                ? " bg-neutral-800 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!selected}
          >

            {status==='loading'?<Loader/>:
            <>
            Continue
                <BsArrowRight />
            </>
            
            }
            

          </button>
          <button className="absolute right-4 text-xl bg-red-50 rounded-xl rounded-tr-xl p-1 text-red-400 top-4" onClick={()=>{setShowMerchants(false)}}>
            <IoCloseOutline/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectMerchant;
