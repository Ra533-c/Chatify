import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
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
                navigate("/chat");
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
        }
    }
    const handleGoogleLogin = () => {
        // Backend URL jahan Google OAuth start hota hai
        window.location.href = "http://localhost:3000/api/v1/user/auth/google";
        //                              ↑
        //                     Ye exact URL hona chahiye
        //                     Route 1 (authRoute.js) se match karna chahiye
    };

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
                            className='w-full input input-bordered h-10 outline-none text-black'
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
                            className='w-full input input-bordered h-10 outline-none text-black'
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
                    <div className='mt-4 mb-4'>
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            className='w-full flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors'
                        >
                            {/* Google Icon (SVG) */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Divider */}
                    <div className='flex items-center my-4'>
                        <div className='flex-1 border-t border-gray-400'></div>
                        <span className='px-3 text-gray-400 text-sm'>OR</span>
                        <div className='flex-1 border-t border-gray-400'></div>
                    </div>
                    <div>
                        <AnimatedButton type="submit">Login</AnimatedButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;