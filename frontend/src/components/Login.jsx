import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; // Axios import kiya
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/Slice/userSlice";
import AnimatedButton from './AnimatedButton';

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const { authUser } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/login", user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                console.log("the res come from backend:-", res)
                navigate("/");
                console.log("the res.data:-", res.data);
                dispatch(setAuthUser(res.data));
                toast.success(res.data.message);
                setUser({
                    username: "",
                    password: ""
                });
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
            console.log(err)
            console.log(err.response?.data); // Error ka asli reason dekhne ke liye
        }
    }
    return (
        <div className=' text-white min-w-96 mx-auto'>
            <div className='width-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>username</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            value={user.username}
                            className='w-full input input-bordered h-10 outline-none'
                            type="text"
                            name='username'
                            placeholder='ronin_goswami'
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                            className='w-full input input-bordered h-10 outline-none'
                            type="password"
                            name='Password'
                            placeholder='abc#123'
                        />
                    </div>
                    <div className='text-white flex items-center justify-center mb-3'>
                        <p>Don't have an account?</p>
                        &nbsp;
                        <Link className='hover:underline hover:text-blue-600' to={"/signup"}>
                            Signup
                        </Link>
                    </div>
                    <div>
                        <AnimatedButton type="submit">Login</AnimatedButton>                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;