import react from "react";

const SingleMessage = ({message}) => {
    return (
        <div className="flex-1  overflow-auto">
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                        />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50 !text-white">12:45</time>
                </div>  
                <div className="chat-bubble text-white">{message.message}</div>
            </div>
        </div>
    )
}
export default SingleMessage;
