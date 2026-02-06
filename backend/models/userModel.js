import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function(){
            return this.authProvider === 'normal';
        }
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    profilePhoto: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: function(){
            return this.authProvider === 'normal';
        }
    },
    authProvider:{
        type: String,
        enum:['normal','google'],
        default:'normal'
    },
    googleId:{
        type:String,
        unique:true,
        sparse:true
    }
}, { timestamps: true });
export const User = mongoose.model("User", userModel);