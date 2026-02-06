import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/Slice/messageSlice";

const useGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((store) => store.user);
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:3000/api/v1/message/${selectedUser?._id}`);
                dispatch(setMessages(res.data?.conversation?.messages || []));
                console.log("res from useGetMessages", res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessage();
    }, [selectedUser])
}
export default useGetMessages;