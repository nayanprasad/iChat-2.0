"use client"
import React, {useContext, createContext, useCallback, useEffect} from 'react';
import { io as ClientIO } from "socket.io-client";


interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContextType {
    sendMessage: (message: string) => void;
    socket: any | null;
    isConnected: boolean;
}


export const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);


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
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
