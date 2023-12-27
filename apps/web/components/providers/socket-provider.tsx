"use client"
import React, {useContext, createContext, useCallback, useEffect} from 'react';
import { io as ClientIO } from "socket.io-client";


interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContextType {
    sendMessage: (message: string) => any;
    // messages: string[];
}


export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if(!context)
        throw new Error("useSocket undefined");
    return context;
};


const SocketProvider = ({children}: SocketProviderProps) => {

    const sendMessage: SocketContextType["sendMessage"] = useCallback((message) => {
        console.log("Sending message", message);
    }, []);

    useEffect(() => {
        const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL);

        return  () => {
            socket.disconnect();
        }
    }, []);


    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
