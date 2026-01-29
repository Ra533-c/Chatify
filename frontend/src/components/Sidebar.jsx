import React from 'react';
import { MdSearch } from "react-icons/md";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {useNavigate} from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();
    const LogoutHandler = async () =>{
        try{
            axios.defaults.withCredentials = true ;
            const res = await axios.get("http://localhost:3000/api/v1/user/logout");
            navigate("/login")
            toast.success("Logout Successfully");
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col' >
            <form className='flex items-center justify-center gap-3' action="">
                <input
                    className='input input-border rounded-md outline-none '
                    type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn hover:text-blue-500 hover:bg-white  bg-zinc-600 text-white rounded-md'>
                    <MdSearch className='outline-none' size='24px' />
                </button>
            </form>
            <div className="divider"></div>
            <OtherUsers />
            <div className='flex justify-end mt-3'>
                <button onClick={LogoutHandler} className='btn btn-sm hover:text-red-500 transition-colors'>Logout</button>
            </div>
        </div>
    )
}
export default Sidebar;