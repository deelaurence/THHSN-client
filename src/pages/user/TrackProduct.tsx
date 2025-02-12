import OrderTracking from '../../components/TrackingOrder';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { getAllUserOrders } from '../../store/userSlice';
import PageHeader from '../../components/PageHeader';
import { Order } from '../../interfaces/order';
import { GiCancel } from 'react-icons/gi';
import { FaBox, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import PriceToast from '../../components/PriceToast';
import { sdk } from '../../utils/sdk';
import { truncate } from '../admin/sales/Sales';
import Loader from '../../components/Loader';

const TrackProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(getAllUserOrders());
  }, [dispatch]);

  const { allOrders,status } = useSelector((state: RootState) => state.user);

  const statusColors = {
    pending: 'bg-yellow-300 ', // Yellow for pending
    shipped: 'bg-blue-300 ', // Blue for shipped
    dispatched: 'bg-purple-300 ', // Purple for dispatched
    ready: 'bg-green-300 ', // Green for ready
  };

  return (
    <div className="px-6 flex min-h-[70vh] flex-col gap-2 my-12">
      <PageHeader heading="" accent="Order status." />
      <p className='-mt-24 mb-12 text-sm'>Click on any order to check the status</p>
			
			{status==='loading'&&<Loader/>}
			{allOrders?.map((single) => (
        <div
          key={single.reference}
          className="border-b-2 flex items-center justify-between border-b-neutral-300 dark:border-b-neutral-800 pb-2 cursor-pointer"
          onClick={() => setSelectedOrder(single)} // Open modal on click
        >
          <p className="text-sm flex items-center gap-2">
            <FaBox className="text-gray-500" /> { truncate(single.description.cart[0].name,30)}
          </p>
					
					<div className='flex items-center gap-2'>
						<p className='text-xs opacity-70  underline'>
							{single.deliveryStatus}
						</p>
					  {/* @ts-ignore */}
						<p className={`capitalize dark:text-primary border-neutral-300 dark:border-none border text-[10px] h-3 w-3 font-semibold rounded-full ${statusColors[single.deliveryStatus] || 'text-gray-500'
							}`}
							>
						</p>
					</div>
        </div>
      ))}

      {/* Full Page Overlay Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[999999999]"
          onClick={() => setSelectedOrder(null)} // Close when clicking outside
        >
          <div
            className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[100vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
          >
            {/* Close Button */}
            <button
              className="absolute top-12 right-4 h-6 w-6 text-red-400 dark:text-red-400 text-2xl hover:text-red-500 rounded-full"
              onClick={() => setSelectedOrder(null)}
            >
              <GiCancel />
            </button>

            {/* Header */}
            <h2 className="text-5xl mt-16 mb-2 font-queens">Order Details</h2>
            <p className="text-sm text-gray-500">Tracking code: {selectedOrder.reference}</p>

            {/* Delivery Message */}
            {selectedOrder.deliveryMessage && (
              <div className="mt-2 flex text-xs items-start gap-2">
                <div className="h-6 w-6 border overflow-hidden rounded-full">
                  <img src={sdk.betranImage} alt="" />
                </div>
								<p className='max-w-[80%]'>
                <span className="">Betran:</span> "{selectedOrder.deliveryMessage}"
								</p>
              </div>
            )}

            {/* Ordered Items */}
            <div className="mt-10">
              <h3 className="text-lg flex items-center gap-2">
								 Cart details
              </h3>
              <div className="mt-2 opacity-70 text-xs space-y-4">
                {selectedOrder.description.cart.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 border-b dark:border-b-neutral-600 pb-2">
                    <div>
                      <p className="">{item.name}</p>
                      <p className="text-sm ">Qty: {item.quantity}</p>
                      <PriceToast price={item.price} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="mt-6">
              <h3 className="text-lg my-2 mb-2 flex items-center gap-2">
								Shipping Details
              </h3>
              <p className="text-xs flex gap-1 items-center opacity-70">
                <span className="font-medium"> <FaMapMarkerAlt/> </span> {selectedOrder.description.address}
              </p>
              <p className="text-xs flex items-center mt-2 gap-1 opacity-70">
                <span className="font-medium"><FaPhoneAlt/></span> {selectedOrder.description.telephone}
              </p>
            </div>

            {/* Tracking Component */}
            <div className="mt-6">
              <OrderTracking
                deliveryStatus={selectedOrder?.deliveryStatus || ''}
                reference={selectedOrder.reference}
                deliveryMessage={selectedOrder?.deliveryMessage || ''}
                deliveryTimeline={selectedOrder?.deliveryTimeline || []}
                isAdmin={false}
                fullOrderDetails={selectedOrder}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackProduct;
