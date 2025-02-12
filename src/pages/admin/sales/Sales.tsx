import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState} from '../../../store/store';
import { FiChevronDown, FiChevronUp, FiMail, FiPhone, FiMapPin, FiGlobe, FiHome, FiCheckCircle, FiXCircle, FiBox, FiCalendar } from 'react-icons/fi';
import PriceToast from '../../../components/PriceToast';
import OrderTracking from '../../../components/TrackingOrder';
import { GiCancel } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { editTrackingStatus, fetchPayments } from '../../../store/adminSlice';
import Loader from '../../../components/Loader';


export const truncate = (text: string, breakpoint: number): string => {
  return text.length > breakpoint ? text.slice(0, breakpoint) + "..." : text;
};

export interface OrderData {
  reference:string,
  deliveryStatus: string, // Current status of the order
  deliveryMessage: string, // Current status of the order
  deliveryTimeline: [
    { status: string, time: string },
    { status: string, time: string }, 
    { status: string, time: string }, 
  ],
};



const SalesInventory: React.FC<{filter:string}> = ({filter}) => {
  const dispatch: AppDispatch = useDispatch();
  let {orders,status } = useSelector((state: RootState) => state.admin);
  const [expandedSales, setExpandedSales] = useState<string | null>(null);
  const [expandedCart, setExpandedCart] = useState<boolean>(false);
  const [hideTrackingBar, setHideTrackingBar]=useState<boolean>(true)
  const [currentOrder,setCurrentOrder]=useState<OrderData|null>(null)
  const [currentStatus,setCurrentStatus]=useState('')
  

  orders=orders.filter((order)=>{
    return order.deliveryStatus==filter
  })


  const handleToggle = (reference: string) => {
    setExpandedCart(false)
    setHideTrackingBar(true)
    setExpandedSales((prev) => (prev === reference ? null : reference));
  };


  // useEffect(()=>{
  //   dispatch(fetchPayments())
  // },[status])

  const handleStatusUpdate = (status:any) =>{
    console.log(status)
    setCurrentStatus(status)
    if(!currentOrder) return
    dispatch(editTrackingStatus({reference:currentOrder.reference,deliveryStatus:status}))
    .then((result: any) => {
      if (result.meta.requestStatus === 'fulfilled') {
            setCurrentOrder({...currentOrder,deliveryStatus:status})
          }
    });

    
    dispatch(fetchPayments())
  }
  
  useEffect(()=>{
    dispatch(fetchPayments())
  },[currentStatus])


  return (
    <div className="container flex flex-col gap-3 mx-auto mt-12">

      
      {/* {<DashboardNav menuItems={menuItems} showNav={true}/>} */}
      
      
      {orders.map((order) => (
        <div
          className="flex flex-col border-b dark:border-b-neutral-800 pb-2 cursor-pointer"
          key={order.reference} 
        >
          <div 
          onClick={() => handleToggle(order.reference)}
          className="flex gap-3 items-center justify-between">
            <div

            
            className="flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1">
              {/* <FaBagShopping  className="text-lg" /> */}
              <h1 className="text-sm">{truncate(order.description.cart[0].name,20)}</h1>
              <h2 className='text-xs opacity-60'>/{truncate(order.description.cart[0].variant.name,20)}</h2>
            </div>
            {expandedSales === order.reference ? (
              <FiChevronUp className="text-gray-500" />
            ) : (
              <FiChevronDown className="text-gray-500" />
            )}
          </div>


        



          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out`}
            style={{
              maxHeight: expandedSales === order.reference ? '1000px' : '0',
              opacity: expandedSales === order.reference ? 1 : 0,
            }}
          >
            <div className="mx-4 my-6 relative text-sm text-neutral-500 ">
            
            <section
              className={`${hideTrackingBar ? "max-h-0 opacity-0 scale-95" : "max-h-[1000px] opacity-1 mb-10  scale-100"} 
              transition-all duration-[500ms] ease-in-out overflow-hidden  top-8 left-0 z-[9999999]`}
              >
              <p className='absolute z-20 right-4 text-lg text-red-400 top-4'><GiCancel onClick={()=>{setHideTrackingBar(true)}}/></p>
              {status==='loading'&&<div className='absolute z-30 bg-[rgba(0,0,0,.3)] w-full h-full flex items-center justify-center '>
                <Loader/>
              </div>}
              <OrderTracking
                deliveryStatus={currentOrder?.deliveryStatus||""}
                reference={order.reference}
                deliveryMessage={currentOrder?.deliveryMessage||""}
                deliveryTimeline={currentOrder?.deliveryTimeline||[]}
                isAdmin={true}
                fullOrderDetails={order}
                onStatusUpdate={(newStatus) => handleStatusUpdate(newStatus)} 
                />
            </section>
            
            <h1 className="font-queens text-2xl">{order.description.cart[0].name}</h1>
              <PriceToast price={order.amount} className="text-5xl opacity-60 mb-2 pb-2 font-queens border-b dark:border-b-neutral-800" />
              <div className='flex gap-2 pb-1 border-b dark:border-b-neutral-800'>Products/<PriceToast price={Number(order.description.cartTotal)}/> </div>
              <div className='flex gap-2 pb-1 border-b dark:border-b-neutral-800'>Shipping/<PriceToast price={Number(order.description.shippingFees)}/> </div>
              <p 
                onClick={()=>{
                  console.log(order.reference)
                  setHideTrackingBar(false)
                  setCurrentOrder({
                    reference:order.reference,
                    deliveryStatus: order.deliveryStatus, // Current status of the order
                    deliveryMessage: order.deliveryMessage||"", // Current status of the order
                    deliveryTimeline: order.deliveryTimeline,
                  })
                }}
                className='bg-yellow-700 w-fit p-1 px-4 my-4 rounded-md text-white'>Update Status</p>
              <p className="flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1"><FiCalendar /> Date: {order.date || 'Not provided'}</p>
              <p className="flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1"><FiMail /> Email: {order.owner || 'Not provided'}</p>
              <p className="flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1"><FiPhone /> Phone: {order.description.telephone || 'Not provided'}</p>
              <p className="flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1"><FiMapPin /> Address: {order.description.address || 'Not provided'}</p>
              <p className="flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1"><FiGlobe /> Country: {order.description.country || 'Not provided'}</p>
              <p className="flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1"><FiHome /> City: {order.description.selectedCity || 'Not provided'}</p>
              <p className="flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1">
                {order.status === 'Success' ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-red-500" />} Payment Status: {order.status}
              </p>
              <div className="ml-6 space-y-1">
                <div className='flex mt-6 items-center gap-1'>
                    <h2 
                    onClick={() => setExpandedCart(!expandedCart)}
                    className="">Cart Items</h2>

                    {expandedCart?<FiChevronUp className="" />
                    :<FiChevronDown className="" />}
                </div>
                {order.description.cart.map((item, index) => (
                  <div 
                  key={index}
                  className={`overflow-hidden [&>*]:text-[10px] flex items-center gap-2 border-b dark:border-b-neutral-800 pb-1 ml-4 transition-all duration-300 ease-in-out`}
                    style={{
                    maxHeight: expandedCart ? '500px' : '0',
                    opacity: expandedCart  ? 1 : 0,
                    }}
                  >
                    <FiBox className="" />
                    <p>{item.name}/{item.variant.name}</p>
                    <PriceToast price={Number(item.price)} className='text-[10px] font-mono'/>
                    <p>x{item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesInventory;
