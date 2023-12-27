"use client";
import React, {useEffect} from 'react';
import {X, SendHorizontal} from "lucide-react";
import Message from "./message";
import {useSocket} from "../providers/socket-provider";
import {redirect, useRouter} from "next/navigation";
import {UserMessages} from "../providers/socket-provider";


const Chat = () => {

    const router = useRouter();
    const {sendMessage, messages, user, reset} = useSocket();

    const [message, setMessage] = React.useState("");


    const handSend = () => {
        const data = {
            user,
            message
        }
        sendMessage(data);
        setMessage("");
    }

    const handleClose = () => {
        reset();
        router.push("/");
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
                    <X onClick={handleClose}/>
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
                    <input placeholder="Type message here" type="text" id="chatInput" value={message} onChange={(e) => setMessage(e.target.value)}
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
