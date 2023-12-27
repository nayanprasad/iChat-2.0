"use client";
import React, {useEffect} from 'react';
import {X, SendHorizontal} from "lucide-react";
import Message from "./message";
import {useSocket} from "../providers/socket-provider";
import {redirect} from "next/navigation";
import {UserMessages} from "../providers/socket-provider";


const messagesHard = [
    {
        id: "1",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "2",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "3",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "4",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "5",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "6",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "7",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "8",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "9",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "10",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "11",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "12",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "13",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "14",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "15",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "16",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "17",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "18",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "19",
        user: "Admin",
        message: "Welcome to iChat"
    },
    {
        id: "20",
        user: "you",
        message: "Welcome to iChat"
    },
]


const Chat = () => {

    const {sendMessage, messages, user} = useSocket();
    const [id, setId] = React.useState("1");
    const [message, setMessage] = React.useState("");

    console.log("messages", messages)

    const handSend = () => {
        const data = {
            user,
            message
        }
        sendMessage(data);
        setMessage("");
    }

    useEffect(() => {
        if(!user)
            redirect("/");
    }, []);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>iChat</h2>
                    <X/>
                </div>
                <div className="chatBox">
                    {messages?.map((item: UserMessages, i: number) =>
                        <Message
                            key={i}
                            user={item.user === user ? "" : item.user}
                            message={item.message}
                            classs={item.user === user ? "right" : "left"}
                        />
                    )}

                </div>
                <div className="inputBox">
                    <input type="text" id="chatInput" value={message} onChange={(e) => setMessage(e.target.value)}
                           onKeyPress={(event) => event.key === 'Enter' ? handSend() : null}/>
                    <button onClick={handSend} className="sendBtn">
                        <SendHorizontal/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
