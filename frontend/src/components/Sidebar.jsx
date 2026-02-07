import React from 'react';
import { MdSearch } from "react-icons/md";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setfilteredUsers, setAuthUser, setSelectedUser, setOnlineUsers, setOtherUsers } from '../redux/Slice/userSlice';
import { setSocket } from '../redux/Slice/socketSlice';
import { setMessages } from '../redux/Slice/messageSlice';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
    // 1.fetch socket from redux 
    const { socket } = useSelector((store) => store.socket);
    const { messages } = useSelector((store) => store.message);
    const { otherUsers } = useSelector((store) => store.user);
    const { filteredUsers } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const LogoutHandler = async () => {
        try {

            // 2. disconnect the socket if exists 
            if (socket) {
                socket.disconnect();
            }

            // 3.call backend logout API
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`);

            // 4.redux state cleanup
            dispatch(setAuthUser(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
            dispatch(setOnlineUsers(null));
            dispatch(setSocket(null));
            dispatch(setMessages(null));

            // 5.navigate to login page 
            navigate("/")
            toast.success("Logout Successfully");

        } catch (err) {
            toast.error(err?.response?.data?.message || "Logout failed");
        }
    }
    const searchSubmitHandler = (e) => {

        //cause we already have the logic in the onChange handler
        e.preventDefault();
        // try {
        //     const conversationUser = otherUsers?.filter((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        //     if (conversationUser.length > 0) {
        //         dispatch(setfilteredUsers(conversationUser));
        //     } else {
        //         toast.error("User not found");
        //     }
        // } catch (err) {
        //     toast.error(err.response.data.message);
        // }
    }
    return (
        <div className='border-r border-slate-500 p-3 flex flex-col' >
            <form onSubmit={searchSubmitHandler} className='flex items-center justify-center gap-3' action="">
                <input
                    value={search}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearch(value);
                        if (value.trim() === '') {
                            // Search box empty → Show all users
                            dispatch(setfilteredUsers(null));
                        } else {
                            // Search box has text → Filter users
                            const filtered = otherUsers?.filter((user) => user.fullName.toLowerCase().includes(value.toLowerCase()));
                            dispatch(setfilteredUsers(filtered?.length > 0 ? filtered : null));
                        }
                    }}
                    className='input input-border rounded-md outline-none text-white bg-zinc-700 placeholder:text-gray-400'
                    type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn hover:text-blue-500 hover:bg-white  bg-zinc-600 text-white rounded-md'>
                    <MdSearch className='outline-none' size='24px' />
                </button>
            </form>
            <div className="divider"></div>
            <OtherUsers />
            <div className='flex justify-end mt-auto'>
                <LogoutButton onClick={LogoutHandler} />
            </div>
        </div>
    )
}
export default Sidebar;