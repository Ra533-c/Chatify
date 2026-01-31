import react from "react";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message }) => {
    const scroll = useRef();
    const { authUser } = useSelector((store) => store.user);
    const { selectedUser } = useSelector((store) => store.user);
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    
    return (
        <div ref={scroll} className="flex-1  overflow-auto">
            <div className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={message.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                        />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50 !text-white">{
                        new Date(message.createdAt).toLocaleString('en-US', {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        })}</time>
                </div>
                <div className={`chat-bubble text-white ${authUser?._id === message?.senderId ? "chat-bubble-neutral" : "chat-bubble-accent text-black"}`}>{message.message}</div>
            </div>
        </div>
    )
}
export default SingleMessage;
