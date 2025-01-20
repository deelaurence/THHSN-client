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
    setSuccessFeedback:(payload:string)=>void;
    toggleCurrency:(payload:boolean)=>void
    setCartItems: (cartItems:number)=>void;
    updateCartcount: ()=>void;
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
        <ThemeContext.Provider value={{ theme,isAdmin,setIsAdmin,successFeedback,setSuccessFeedback, toggleTheme,cartItems,setCartItems,updateCartcount, toggleCurrency, isDollar }}>
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