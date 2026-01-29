import './App.css'
import Signup from './components/signup.jsx'
import Login from './components/Login.jsx'
import Homepage from './components/HomePage.jsx'
import Notfound from './components/Notfound.jsx'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";



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
  return (
    <div className='overflow-auto h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
