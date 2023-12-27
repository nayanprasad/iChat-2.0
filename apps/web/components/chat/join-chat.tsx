"use client";
import React, {useState} from 'react'
import iChatlogo from "../../public/ichat-logo.png";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useSocket} from "../providers/socket-provider";

const Join = () => {

    const router = useRouter();
    const {setUserName}  = useSocket()

    const [username, setUsername] = useState<string>("");

    const handleClick = () => {
        setUserName(username);
        setUsername("");
        router.push("/chat");
    }


    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <Image src={iChatlogo} alt="logo" width={150} height={100} />
                <h1>iCHAT</h1>
                <input type="text" id="joinInput" placeholder="Enter Your Name" onChange={(e) => setUsername(e.target.value)}
                       value={username}/>
                <button onClick={handleClick} className="joinbtn">JOIN</button>
            </div>
        </div>
    )
}

export default Join
