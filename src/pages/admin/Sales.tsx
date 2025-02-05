import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments } from '../../store/adminSlice';
import { RootState, AppDispatch } from '../../store/store';
import PageHeader from '../../components/PageHeader';
import { Sdk } from '../../utils/sdk';
import Loader from '../../components/Loader';
import SingleLineError from '../../components/errors/SingleLineError';
import { FiChevronDown, FiChevronUp, FiMail, FiPhone, FiMapPin, FiGlobe, FiHome, FiCheckCircle, FiXCircle, FiBox, FiCalendar } from 'react-icons/fi';
import PriceToast from '../../components/PriceToast';
// import data from './order.json'
import { FaBagShopping } from 'react-icons/fa6';
const sdk = new Sdk();

const SalesInventory: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  let {orders,status, error } = useSelector((state: RootState) => state.admin);
  const [expandedSales, setExpandedSales] = useState<string | null>(null);
  const [expandedCart, setExpandedCart] = useState<boolean>(false);

  

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleToggle = (reference: string) => {
    setExpandedCart(false)
    setExpandedSales((prev) => (prev === reference ? null : reference));
  };
//  const handleCartToggle = (reference: string) => {
//    setExpandedSales((prev) => (prev === reference ? null : reference));
//    console.log(reference)
//   };

  return (
    <div className="container flex flex-col gap-3 mx-auto p-6">
      <PageHeader heading="" accent="Sales" backToRoute={sdk.adminDashboardRoute} backToLabel="Dashboard" />

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
              <FaBagShopping  className="text-lg" />
              <h1 className="text-sm">{order.description.cart[0].name}</h1>
              <h2 className='text-xs opacity-80'>/{order.description.cart[0].variant.name}</h2>
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
              maxHeight: expandedSales === order.reference ? '500px' : '0',
              opacity: expandedSales === order.reference ? 1 : 0,
            }}
          >
            <div className="mx-4 my-6 text-sm text-neutral-500 space-y-2">
              <PriceToast price={order.amount} className="text-5xl opacity-60 mb-2 pb-2 font-mono border-b dark:border-b-neutral-800" />
              <div className='flex gap-2 pb-1 border-b dark:border-b-neutral-800'>Products/<PriceToast price={Number(order.description.cartTotal)}/> </div>
              <div className='flex gap-2 pb-1 border-b dark:border-b-neutral-800'>Shipping/<PriceToast price={Number(order.description.shippingFees)}/> </div>
              <p></p>
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

      {status === 'loading' && <div className="mt-32"><Loader /></div>}
      {status === 'failed' && (
        <div className="mt-8">
          <SingleLineError errorMessage={error || 'Connection Error. Try again.'} />
        </div>
      )}
    </div>
  );
};

export default SalesInventory;
