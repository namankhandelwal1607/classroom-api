import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {type: String, required: true},
    userPassword: {type: String, required: true}
});

const User =  mongoose.model('User', userSchema);

export {User};