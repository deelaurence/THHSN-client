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
  const successMessage = useSelector((state: RootState) => state.admin.successFeedback);
  const adminError = useSelector((state: RootState) => state.admin.error);
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error" | null; message: string[] }>({
    type: null,
    message: []
  });
  
  useEffect(() => {
    if (adminStatus==="failed"||adminStatus === "succeeded"||successFeedback) {
        setVisible(true);
        
        //coming from admin slice
        if(adminStatus==='succeeded'){
          const newMessages = [...notification.message, successMessage || ""];
          if (newMessages.length > 2) newMessages.shift();
          setNotification({type:"success", message: newMessages});
        }
        //coming from client side
        if(successFeedback){
          const newMessages = [...notification.message, successFeedback || ""];
          if (newMessages.length > 2) newMessages.shift();
          setNotification({type:"success", message: newMessages});
        }
        //coming from admin slice
        if(adminStatus=="failed"){
          const newMessages = [...notification.message, adminError || ""];
          if (newMessages.length > 2) newMessages.shift();
          setNotification({type:"error", message: newMessages});
        }
        const timer = setTimeout(() => {
        setVisible(false);
        setSuccessFeedback("")
      }, 3000);
        return () => clearTimeout(timer);
    }
    
  }, [adminStatus,successFeedback]);

  return (
    notification.message&&notification.message.length>0&&
    <div className={`fixed z-[99999999] text-center p-4 w-screen bg-yellow-600 text-white ${
      visible ? "animate-slideIn" : "animate-slideOut"
    }`}>
      {messageProps??notification.message[notification.message.length-1]}
    </div>
  );
};

export default Notifications;