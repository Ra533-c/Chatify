import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/Slice/userSlice";


const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector((store)=>store.user);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
        console.log("selected user =>", user);
    }
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={`flex text-white gap-2 items-center justify-center hover:bg-zinc-600 rounded-md cursor-pointer p-2 ${selectedUser?._id === user?._id ? "bg-zinc-600" : ""}`}>
                <div className="avatar online">
                    <div className="w-10 rounded-full">
                        <img src={user?.profilePhoto} alt="user profile" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="">
                        <p>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0"></div>
        </>
    )
}
export default OtherUser;