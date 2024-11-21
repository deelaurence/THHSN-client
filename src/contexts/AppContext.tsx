import React,{createContext, useContext, useEffect} from "react";
import { Sdk } from "../utils/sdk";
const sdk = new Sdk()

interface ThemeContextType{
    theme:string;
    toggleTheme: ()=>void;
}




export const ThemeContext = createContext<ThemeContextType|undefined>(undefined);

export const ThemeProvider:React.FC<{children: React.ReactNode}> = ({children})=>{
    const [theme, setTheme] = React.useState(sdk.theme??'dark');
    document.documentElement.classList.add(theme)
    
    const toggleTheme = ()=>{
        const newTheme = theme === 'light'?'dark':'light'
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        sdk.settheme(newTheme)
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

    

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
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