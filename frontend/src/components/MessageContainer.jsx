import React, { useEffect } from "react";
import Sendinput from "./Sendinput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/Slice/userSlice";


const MessageContainer = () => {
    const { selectedUser } = useSelector((store) => store.user)
    const { authUser, onlineUsers } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const isOnline = onlineUsers?.includes(selectedUser?._id);
    useEffect(() => {
        return () => dispatch(setSelectedUser(null));
    }, [])
    return (
        <>
            {selectedUser !== null ? (
                <div className="text-white md:min-w-[550px] flex flex-col overflow-auto">
                    <div className="flex text-white gap-2 items-center justify-center px-4 py-2 mb-2 bg-zinc-800">
                        <div className={`avatar ${isOnline ? "online" : ""}`}>
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
                    <Sendinput />
                </div>
            ) : (
                <div className="flex p-2 flex-col text-white items-center justify-center md:min-w-[550px] h-full">
                    <h1 className="text-4xl font-bold">Welcome! {authUser?.fullName || "Guest"} 👋</h1>
                    <p className="mt-2 font-bold">Select a user to start conversation</p>
                </div>
            )
            }
        </>

    )
}
export default MessageContainer;