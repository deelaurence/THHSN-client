import React, { useState, useRef, useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { editTrackingStatus } from "../store/adminSlice";
import { Order } from "../interfaces/order";
import { FaCheck } from "react-icons/fa";

type DeliveryTimeline = {
  status: string;
  time: string;
};

type OrderTrackingProps = {
  deliveryStatus: string;
  deliveryMessage: string;
  reference:string;
  fullOrderDetails?:Order;
  deliveryTimeline: DeliveryTimeline[];
  isAdmin?: boolean;
  onStatusUpdate?: (newStatus: string) => void;
};

const orderSteps = ["pending", "dispatched", "shipped", "ready"];

const OrderTracking: React.FC<OrderTrackingProps> = ({ 
  deliveryStatus, 
  deliveryTimeline, 
  isAdmin, 
  reference,
  fullOrderDetails,
  deliveryMessage, 
  onStatusUpdate 
}) => {
  
  const completedIndex = orderSteps.indexOf(deliveryStatus);
  const [deliveryMessageState, setDeliveryMessage] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch<AppDispatch>()
  // Adjust textarea height based on content
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [deliveryMessageState]);

  return (
    <div className="max-w-md text-primary mx-auto p-6 bg-gradient-to-b from-white to-[rgba(255,255,255,.92)] via-white shadow-md rounded-lg relative">
      <h2 className="mt-6 font-medium text-2xl text-neutral-600">Tracking</h2>
      <h2 className="mb-6 text-sm text-neutral-400">{fullOrderDetails?.description.cart[0].name}[{fullOrderDetails?.reference}]</h2>
      <div className="relative">
        {/* Full Vertical Line (Gray) */}
        <div className="absolute left-4 top-2 bottom-0 w-[2px] bg-gradient-to-b from-gray-300 via-gray-300 to-transparent"></div>

        {/* Completed Progress Line (Green) */}
        <div
          className="absolute left-4 top-2 w-[2px] bg-gradient-to-b from-green-600 via-green-400 to-transparent"
          style={{ height: `${(completedIndex + 1) * 22}%` }}
        ></div>

        {orderSteps.map((step, index) => {
          const timelineEntry = deliveryTimeline.find(entry => entry.status === step);
          const isCompleted = index <= completedIndex;
          return (
            <div key={step} className="relative flex items-start mb-8 pl-12">
              <button
                className={`absolute left-[2.4%] w-5 h-5 rounded flex items-center justify-center text-white font-bold
                  ${isCompleted ? "bg-green-600 border-2 border-green-600" : "bg-gray-300 border-2 border-gray-300"}
                  ${isAdmin ? "cursor-pointer" : "cursor-default"}
                `}
                onClick={() => isAdmin && onStatusUpdate && onStatusUpdate(step)}
                disabled={!isAdmin}
              >
                {isCompleted && <span className="text-xs text-white"><FaCheck/></span>}
              </button>

              <div>
                <h3 className={`font-semibold text-sm ${isCompleted ? "text-green-600" : "text-gray-400"}`}>
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </h3>
                <p className={`text-xs ${isCompleted ? "text-gray-600" : "text-gray-400"}`}>
                    {step === "pending" && isCompleted 
                        ? "Your payment will be confirmed soon"
                        : step === "dispatched" && isCompleted
                        ? "Your order has been dispatched"
                        : step === "shipped" && isCompleted
                        ? "Your product is on the way"
                        : step === "ready" && isCompleted
                        ? "Your order is ready for collection"
                        : "Awaiting confirmation"}
                </p>

                {timelineEntry && <span className="text-xs text-gray-500">{timelineEntry.time}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Message Input */}
      {isAdmin&&<div className="mt-12 text-primary">
        <h3 className="text-xs text-neutral-600">Leave a note for {fullOrderDetails?.description.firstName||fullOrderDetails?.description.lastName||fullOrderDetails?.name||'the customer'}?</h3>
        <textarea
          ref={textAreaRef}
          placeholder={deliveryMessage||"Enter your message"}
          className="w-full message-client border-0 border-l-[4px] pl-1  border-gray-200 outline-none focus:border-gray-300 bg-transparent mt-6  text-sm  resize-none"
          value={deliveryMessageState}
          onChange={(e) => setDeliveryMessage(e.target.value)}
          rows={1}
        />
        <h3 
        onClick={()=>{
            dispatch(editTrackingStatus({reference,deliveryMessage:deliveryMessageState,deliveryStatus}))
        }}
        className="bg-yellow-600 mt-3 rounded-lg text-white text-end px-2 py-2 flex items-center justify-center gap-4">Send </h3>
      </div>}

    </div>
  );
};

export default OrderTracking;
