import React,{createContext, useContext, useEffect} from "react";
import { Sdk } from "../utils/sdk";
import { Cart } from "../interfaces/cart";
const sdk = new Sdk()

interface ThemeContextType{
    theme:string;
    isAdmin:boolean;
    cartItems: number;
    isDollar:boolean;
    successFeedback:string;
    cartTotal:number;
    totalToCheckout:number;
    setCartTotal: React.Dispatch<React.SetStateAction<number>>
    setSuccessFeedback:(payload:string)=>void;
    toggleCurrency:(payload:boolean)=>void
    setCartItems: (cartItems:number)=>void;
    updateCartcount: ()=>void;
    updateCartSum: (total:number)=>void;
    setTotalToCheckout:React.Dispatch<React.SetStateAction<number>>
    setIsAdmin: (isAdmin:boolean)=>void;
    toggleTheme: ()=>void;
}




export const ThemeContext = createContext<ThemeContextType|undefined>(undefined);

export const ThemeProvider:React.FC<{children: React.ReactNode}> = ({children})=>{
    const [theme, setTheme] = React.useState(sdk.theme??'light');
    const [cartItems, setCartItems] = React.useState(sdk.getCart().length)
    const [isAdmin, setIsAdmin]=React.useState(sdk.getAdminObject()?true:false)
    const [isDollar, setIsDollar]=React.useState(sdk.persistedIsDollar==="true"?true:false)
    const [successFeedback, setSuccessFeedback]=React.useState<string>("")
    const [cartTotal,setCartTotal]=React.useState(0)    
    const [totalToCheckout, setTotalToCheckout] = React.useState(0)
    
    useEffect(()=>{setIsAdmin(sdk.getAdminObject()?true:false)},[sdk.getAdminObject()])
    
    document.documentElement.classList.add(theme)
    
    const toggleTheme = ()=>{
        const newTheme = theme === 'light'?'dark':'light'
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        sdk.settheme(newTheme)
    }

    const toggleCurrency = (payload:boolean)=>{
        setIsDollar(payload)
    }


    const updateCartSum = (total:number)=>{
        setCartTotal(total)
    }

    
    useEffect(()=>{
        const savedTheme = sdk.theme
        if(savedTheme){
         savedTheme==='light'?
         setTheme('light'):
         setTheme('dark')  
         document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    },[])

    
    
    const updateCartcount =()=>{
        let total=0
        sdk.getCart().forEach((item:Cart)=>{
            total+=item.quantity
        })
        setCartItems(total)
    }
    



    return (
        <ThemeContext.Provider value={{ totalToCheckout,setTotalToCheckout,updateCartSum,cartTotal,setCartTotal,theme,isAdmin,setIsAdmin,successFeedback,setSuccessFeedback, toggleTheme,cartItems,setCartItems,updateCartcount, toggleCurrency, isDollar }}>
          {children}
        </ThemeContext.Provider>
    );
    
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};