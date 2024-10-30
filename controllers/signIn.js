import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

const signIn = async (req, res) => {
    try {
        const { userName, userPassword } = req.body;

        const user = await User.findOne({ userName });
        
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }

        if (user.isVerified == false) {
            return res.status(404).json({
                message: 'User not verified',
                success: false,
            });
        }


        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false,
            });
        }

        return res.status(200).json({
            message: 'Sign-in successful',
            success: true,
            userData: {
                userName: user.userName,
                _id: user._id,
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || 'An error occurred during sign-in',
            success: false,
        });
    }
};

export default signIn;
