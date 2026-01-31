import './App.css'
import Signup from './components/signup.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/HomePage.jsx';
import Notfound from './components/Notfound.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useState } from 'react';
import { setSocket } from "./redux/Slice/socketSlice"
import { setOnlineUsers } from "./redux/Slice/userSlice"
import { useDispatch } from 'react-redux';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "*",
      element: <Notfound />
    }
  ]
)

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:3000', {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (users) => {
        console.log("online users :", users);
        dispatch(setOnlineUsers(users));
      });

      return () => {
        socket.disconnect();
      }

    } else {
      dispatch(setSocket(null));
      dispatch(setOnlineUsers(null));
    }
  }, [authUser]);

  return (
    <div className='overflow-auto h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
