import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/Slice/userSlice';

const useGetMe = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
                    withCredentials: true,
                });
                if (res.data) {
                    dispatch(setAuthUser(res.data));
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                dispatch(setAuthUser(null));
            } finally {
                setLoading(false);
            }
        };

        getMe();
    }, [dispatch]);

    return { loading };
};

export default useGetMe;
