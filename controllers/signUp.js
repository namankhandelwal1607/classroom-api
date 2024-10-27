import bcrypt from 'bcrypt';
import { User } from "../models/userModel.js";

const signUp = async (req, res) => {
    try {
        const { userName, userPassword } = req.body;

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const payload = {
            userName,
            userPassword: hashedPassword 
        };

        const user = new User(payload);
        const userSave = await user.save();

        return res.status(201).json({
            message: 'User Created Successfully',
            success: true,
            data: userSave
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || 'An error occurred',
            err: true
        });
    }
};

export default signUp;
