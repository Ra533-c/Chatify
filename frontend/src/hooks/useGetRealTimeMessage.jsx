import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/Slice/messageSlice";


const useGetRealTimeMessage = () => {
    const { socket } = useSelector((store) => store.socket);
    const { messages } = useSelector((store) => store.message)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!socket) return; //if socket is null then return 

        // Event handler function
        const handleNewMessage = (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        }
        // Attach listener
        socket.on("newMessage", handleNewMessage);

        // Cleanup - remove listener on unmount or socket change
        return () => socket.off("newMessage", handleNewMessage)

        }, [socket, setMessages, messages])
}

export default useGetRealTimeMessage;