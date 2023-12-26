"use client";
import React from 'react';
import {X, SendHorizontal} from "lucide-react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from "./message";


const messages = [
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

    const [id, setId] = React.useState("1")

    const handSend = () => {
        console.log("send")
    }

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>iChat</h2>
                    <X/>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages && messages.map((item: any, i: number) =>
                        <Message
                            key={i}
                            user={item.id === id ? "" : item.user}
                            message={item.message}
                            classs={item.id === id ? "right" : "left"}
                        />
                    )}

                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" id="chatInput"
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
