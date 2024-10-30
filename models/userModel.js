import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {type: String, required: true},
    userPassword: {type: String, required: true},
    classStudent: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    classTeacher: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    isVerified: {type: Boolean, default: false}
});

const User =  mongoose.model('User', userSchema);

export {User};