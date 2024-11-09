import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
    isAuthenticated: boolean;
    loading: boolean;
    setAuthenticated: (value: boolean) => void;
    onRegister: () => void;
    onLogin: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isAuthenticated');
            setAuthenticated(isLoggedIn === 'true');
            setLoading(false); // Set loading to false once we have the auth status
        };
        checkAuthStatus();
    }, []);

    const onRegister = async () => {
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setAuthenticated(true);
    };

    const onLogin = async () => {
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setAuthenticated(true);
    };

    return (
        <AppContext.Provider value={{ isAuthenticated, loading, setAuthenticated, onRegister, onLogin }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within an AppProvider");
    return context;
};
