import React from 'react';

interface MessageProps {
    user: string;
    message: string;
    classs: string;
}

const Message: React.FC<MessageProps> = ({ user, message, classs }: MessageProps) => {
    const isAdmin = user === 'Admin';
    const sender = user || 'You';

    return (
        <div className={`messageBox ${isAdmin ? 'middle' : classs}`}>
            {`${sender} : ${message}`}
        </div>
    );
};

export default Message;
