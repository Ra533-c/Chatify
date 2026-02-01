import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import AnimatedButton from './AnimatedButton';


const Signup = () => {
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });
    const navigate = useNavigate();
    const handleCheckbox = (gender) => {
        setUser({ ...user, gender: gender });
        console.log("user after gender:-", user);
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/register", user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login", { replace: true })
                toast.success(res.data.message);
            }

            // Form tabhi clear karein jab Success ho
            setUser({
                fullName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                gender: ""
            });

        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
    return (
        <div className='text-white min-w-96 mx-auto'>
            <div className='width-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center'>Signup</h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Full Name</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                            value={user.fullName}
                            className='w-full input input-bordered h-10 outline-none'
                            type="text"
                            name='fullName'
                            placeholder='Ronin Goswami'
                        />
                    </div>
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
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Email</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                            className='w-full input input-bordered h-10 outline-none'
                            type="email"
                            name='email'
                            placeholder='ronin@example.com'
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                            className='w-full input input-bordered h-10 outline-none'
                            type="password"
                            name='password'
                            placeholder='abc#123'
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Confirm Password</span>
                        </label>
                        <input
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            value={user.confirmPassword}
                            className='w-full input input-bordered h-10 outline-none'
                            type="password"
                            name='Confirm Password'
                            placeholder='abc#123'
                        />
                    </div>
                    <div className='flex items-center mt-4 mb-5'>
                        <div className='flex items-center'>
                            <p>Male</p>
                            <input
                                checked={user.gender === "male"}
                                onChange={() => handleCheckbox("male")}
                                value={user.gender}
                                type="checkbox"
                                className="checkbox mx-2" />
                        </div>
                        <div className='flex items-center'>
                            <p>Female</p>
                            <input
                                checked={user.gender === "female"}
                                onChange={() => handleCheckbox("female")}
                                value={user.gender}
                                type="checkbox"
                                className="checkbox mx-2" />
                        </div>
                    </div>
                    <div className='text-white flex items-center justify-center mb-3'>
                        <p>Already have an account?</p>
                        &nbsp;
                        <Link className='hover:underline hover:text-blue-600' to={"/login"}>
                            Login
                        </Link>
                    </div>
                    <div>
                        <AnimatedButton type="submit">Signup</AnimatedButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;