import React from "react"
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Homepage = () => {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-white">Chatify</h1>
            <div className="flex overflow-auto sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-100">
                <Sidebar />
                <MessageContainer />
            </div>
            <footer className="text-center pb-2">
                <p className="text-white text-base opacity-75">made with ❤️ by Rajni Kant/Rajnis Goswami</p>
            </footer>
        </div>
    )
}
export default Homepage;