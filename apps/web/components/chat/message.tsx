import React from 'react';

interface MessageProps {
    user: string,
    message: string,
    classs: string,
}

const Message = ({user, message, classs}: MessageProps) => {
    if (user) {
        if (user === "Admin") {
            return (
                <div className="messageBox middle">
                    {`${user} : ${message}`}
                </div>
            )
        } else {
            return (
                <div className={`messageBox ${classs}`}>
                    {`${user} : ${message}`}
                </div>
            )
        }
    }

    return (
        <div className={`messageBox ${classs}`}>
            {`You : ${message}`}
        </div>
    )

}

export default Message
