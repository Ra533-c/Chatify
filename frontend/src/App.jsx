import './App.css'
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/HomePage.jsx';  // This is chat page
import LandingPage from './components/LandingPage.jsx';  // NEW
import ProtectedRoute from './components/ProtectedRoute.jsx';  // NEW
import Notfound from './components/Notfound.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { setSocket } from "./redux/Slice/socketSlice"
import { setOnlineUsers } from "./redux/Slice/userSlice"
import { useDispatch } from 'react-redux';
import useGetMe from './hooks/useGetMe.jsx'; // Import the new hook

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/chat",
      element: (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      )
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
  const { loading } = useGetMe(); // Use the hook

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

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div className='text-white text-2xl'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='overflow-auto h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;