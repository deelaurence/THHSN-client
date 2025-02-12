import { createContext, useContext, ReactNode, useMemo } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// Define the type for the context value
interface NavigationContextType {
    navigate: NavigateFunction;
}

// Create context with a default value of `null`
const NavigationContext = createContext<NavigationContextType | null>(null);

// Define props type for the provider component
interface NavigationProviderProps {
    children: ReactNode;
}

// NavigationProvider component
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const navigate = useNavigate();

    // Use useMemo to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({ navigate }), [navigate]);

    return (
        <NavigationContext.Provider value={contextValue}>
            {children}
        </NavigationContext.Provider>
    );
};

// Custom hook for consuming the navigation context
export const useCustomNavigate = (): NavigateFunction => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error("useCustomNavigate must be used within a NavigationProvider");
    }
    return context.navigate;
};
