import React from "react"
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/Slice/messageSlice";

const Sendinput = () => {

    const [inputMessage, setInputMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((store) => store.user);
    const { messages } = useSelector((store) => store.message);

    const submitHandler = async (e) => {
        e.preventDefault();
        // alert(inputMessage)
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/message/send/${selectedUser?._id}`,
                {
                    message: inputMessage,
                },
                {
                    headers: {
                        "Content-Type": "application/json",

                    },
                    withCredentials: true,
                })
            console.log("sendMessage", res);
            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (err) {
            console.log(err)
        }
        setInputMessage("");
    }

    return (
        <div>
            <form onSubmit={submitHandler} action="">
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        className="input px-2 py-2 outline-none text-white border border text-sm rounded-lg block w-full bg-zinc-600"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button
                        className="text-white absolute  inset-y-0 end-0 z-10  flex items-center hover:text-blue-500 transition-colors pr-3  justify-center"
                        type="submit">
                        <IoMdSend size="25px" />
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Sendinput;