import react from "react";
import SingleMessage from "./SingleMessage";
import useGetMessages from "../hooks/useGetMessages.jsx";
import { useSelector } from "react-redux";


const Messages = () => {
    useGetMessages();
    const {messages} = useSelector((store)=>store.message);
    if(!messages || !Array.isArray(messages) || messages.length === 0 ){
        return <p className="text-white flex items-center justify-center flex-1">Loading...</p>
    }
    return (
        <div className="px-4 py-2 flex-1  overflow-auto">
            {
                messages?.map((message)=>{
                    return (
                        <SingleMessage key={message._id} message={message}/>
                    )
                })
            }
        </div>
    )
}
export default Messages;
