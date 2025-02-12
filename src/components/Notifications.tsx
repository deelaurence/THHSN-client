import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useTheme } from "../contexts/AppContext";
import React from "react";
interface NotificationsProps {
  messageProps?: string;
}

const Notifications: React.FC<NotificationsProps> = ({ messageProps }) => {
  const {successFeedback,setSuccessFeedback} = useTheme()
  const adminStatus = useSelector((state: RootState) => state.admin.status);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const successMessage = useSelector((state: RootState) => state.admin.successFeedback);
  const adminError = useSelector((state: RootState) => state.admin.error);
  const userError = useSelector((state: RootState) => state.user.error);


  const shippingStatus=useSelector((state: RootState)=> state.shipping.status);
  const shippingSuccess=useSelector((state: RootState)=> state.shipping.successFeedback);
  const shippingError=useSelector((state: RootState)=> state.shipping.error);

  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error" | null; message: string[] }>({
    type: null,
    message: []
  });
  
  
  useEffect(() => {
    if ([adminStatus, userStatus,shippingStatus].includes("failed") || [adminStatus, userStatus,shippingStatus].includes("succeeded") || successFeedback) {
        setVisible(true);
        
        const newMessages = [...notification.message];
        
        if (adminStatus === 'succeeded') {
          newMessages.push(successMessage || "");
        }
        
        if (userStatus === 'succeeded') {
          newMessages.push(successMessage || "");
        }
        
        if (successFeedback) {
          newMessages.push(successFeedback || "");
        }
        
        if (adminStatus === "failed") {
          newMessages.push(adminError || "");
        }
        
        if (userStatus === "failed") {
          newMessages.push(userError || "");
        }
        
        if (shippingStatus === 'succeeded') {
          newMessages.push(shippingSuccess || "");
        }
        
        if (shippingStatus === "failed") {
          newMessages.push(shippingError || "");
        }
        
        if (newMessages.length > 2) newMessages.shift();
        
        setNotification({
          type: newMessages.some(msg => msg.includes("failed")) ? "error" : "success",
          message: newMessages
        });
        const timer = setTimeout(() => {
        setVisible(false);
        setSuccessFeedback("")
      }, 3000);
        return () => clearTimeout(timer);
    }
    
  }, [adminStatus,userStatus,successFeedback,shippingStatus]);
  return (
    notification.message&&notification.message.length>0
    &&(messageProps||notification.message[notification.message.length-1])&&
    <div className={`fixed no-fade z-[99999999] text-center p-4 w-screen bg-yellow-600 text-white ${
      visible ? "animate-slideIn no-fade" : "no-fade animate-slideOut"
    }`}>
      {messageProps||notification.message[notification.message.length-1]}
    </div>
  );
};

export default Notifications;