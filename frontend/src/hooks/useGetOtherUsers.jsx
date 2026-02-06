import react from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/Slice/userSlice';

const useGetOtherUsers = () => {
    const dispatach = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get("http://localhost:3000/api/v1/user/");
                console.log("res from useGetOtherUsers", res)

                //store this data in the state
                dispatach(setOtherUsers(res.data));
            } catch (err) {
                console.log(err)
            }
        }
        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers;
