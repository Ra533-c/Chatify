import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import messageReducer from "./Slice/messageSlice";

const store = configureStore({
    reducer:{
        user:userReducer,    
        message:messageReducer,  
    }
});

export default store;