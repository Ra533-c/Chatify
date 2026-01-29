import React from "react"
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Homepage = ()=>{
    return (
        <div className="flex overflow-auto sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
            <Sidebar/>
            <MessageContainer/>
        </div>
    )
}
export default Homepage;