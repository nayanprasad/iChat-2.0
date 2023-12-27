"use client"
import React, {useState, useContext, createContext, useCallback, useEffect} from 'react';
import { io as ClientIO, Socket } from "socket.io-client";

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
    const [messages, setMessages] = useState<SocketContextType["messages"]>([]);
    const [user, setUser] = useState<SocketContextType["user"]>("");

    const sendMessage: SocketContextType["sendMessage"] = useCallback((data) => {
        console.log("Sending message", data);
        if(socket) {
            console.log("Sending to server")
            socket.emit("event:message", data);
        }

    }, [socket]);


    const receiveMessages = useCallback((data: UserMessages) => {
        console.log("Received message", data["user"], data.message);
        setMessages((messages) => [...messages, data]);
    }, []);

    const setUserName = useCallback((user: string) => {
        console.log("user name: ", user);
        setUser(user);
    }, []);


    useEffect(() => {
        const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL);
        socket.on("event:message", receiveMessages);
        setSocket(socket);
        return  () => {
            socket.off("event:message", receiveMessages);
            socket.disconnect();
            setSocket(null)
        }
    }, []);


    return (
        <SocketContext.Provider value={{ user, setUserName, sendMessage, messages}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
