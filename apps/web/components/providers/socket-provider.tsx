"use client"
import React, {useState, useContext, createContext, useCallback, useEffect} from 'react';
import { io as ClientIO, Socket } from "socket.io-client";


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

    const  [socket, setSocket] = useState<Socket | null>(null);

    const sendMessage: SocketContextType["sendMessage"] = useCallback((message) => {
        console.log("Sending message", message);
        if(socket) {
            console.log("Sending to server")
            socket.emit("event:message", {message});
        }

    }, [socket]);

    useEffect(() => {
        const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL);
        setSocket(socket);
        return  () => {
            socket.disconnect();
            setSocket(null)
        }
    }, []);


    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
