import React from "react";
import Sendinput from "./Sendinput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const {selectedUser} = useSelector((store)=>store.user)
    return (
        <div className="text-white md:min-w-[550px] flex flex-col overflow-auto">
            <div className="flex text-white gap-2 items-center justify-center px-4 py-2 mb-2 bg-zinc-800">
                <div className="avatar online">
                    <div className="w-10 rounded-full">
                        <img src={selectedUser?.profilePhoto} alt="user profile" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="">
                        <p>{selectedUser?.fullName}</p>
                    </div>
                </div>
            </div>
            <Messages />
            <Sendinput/>
        </div>
    )
}
export default MessageContainer;