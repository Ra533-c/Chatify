import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";
import { useSelector } from "react-redux";

const OtherUsers = () => {
    //my custom hook to get other users
    useGetOtherUsers();
    const { otherUsers } = useSelector((store) => store.user);
    const { filteredUsers } = useSelector((store) => store.user);

    // Display filtered if exists, otherwise show all
    const usersToDisplay = filteredUsers || otherUsers;
    
    if (!usersToDisplay) {  //early return in reactJS
        return <p>Loading...</p>
    }
    return (
        <div className="overflow-auto">
            {
                usersToDisplay?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })
            }
        </div>
    )
}
export default OtherUsers;