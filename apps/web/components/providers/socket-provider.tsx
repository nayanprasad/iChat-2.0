"use client"
import React, {useState, useContext, createContext, useCallback, useEffect} from 'react';
import {io as ClientIO, Socket} from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

export type UserMessages = {
    user: string,
    message: string
}

interface SocketContextType {
    sendMessage: (data: UserMessages) => any;
    setUserName: (user: string) => any;
    user: string
    messages: UserMessages[];
    reset: () => void;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context)
        throw new Error("useSocket undefined");
    return context;
};


const INITIAL_MESSAGES: UserMessages[] = [{
    "user": "Admin",
    "message": "Welcome to iChat"
}];


const SocketProvider = ({children}: SocketProviderProps) => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<SocketContextType["messages"]>(INITIAL_MESSAGES);
    const [user, setUser] = useState<SocketContextType["user"]>("");

    const sendMessage: SocketContextType["sendMessage"] = useCallback((data) => {
        console.log("Sending message", data);
        if (socket) {
            socket.emit("event:message", data);
        }

    }, [socket]);


    const receiveMessages = useCallback((data: UserMessages) => {
        setMessages((messages) => [...messages, data]);
    }, []);

    const setUserName = useCallback((user: string) => {
        setUser(user);
    }, []);

    const reset = useCallback(() => {
        setMessages(INITIAL_MESSAGES);
        setUser("");
    }, []);


    useEffect(() => {
        const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL);
        socket.on("event:message", receiveMessages);
        setSocket(socket);
        return () => {
            socket.off("event:message", receiveMessages);
            socket.disconnect();
            setSocket(null)
        }
    }, []);


    return (
        <SocketContext.Provider value={{user, setUserName, sendMessage, messages, reset}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
