import mongoose from "mongoose";

const userModel = new mongoose.Schema ({
    name: {
        type: String,
        required: [true,'User name is required'],
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        minlength: 5,
        maxlength: 50,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/,'Please fill a valid email address'],
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        minlength: 6,
    },
}, {timestamps: true});

const User = mongoose.model("User", userModel);
export default User;