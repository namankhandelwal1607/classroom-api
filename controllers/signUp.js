import bcrypt from 'bcrypt';
import { User } from "../models/userModel.js";
import sendMail from "../helpers/sendMail.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    try {
        const { userName, userPassword } = req.body;
        const userCheck = await User.findOneAndDelete({userName});

        if (userCheck) {
            return res.status(404).json({
                message: 'UserName already used',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const payload = {
            userName,
            userPassword: hashedPassword 
        };

        const user = new User(payload);
        const userSave = await user.save();

        const token = jwt.sign(
            { id: userSave._id, name: userSave.userName },
            `${process.env.JWT_SECRET}`,
            { expiresIn: '1h' }
        );
        console.log("JWT created", token);
        const subject ="Email verification for ClassConnect";
        const text = `Hey! Welcome to ClassConnect. To verify yourself, click on the link provided in the email and then click "Verify User". This will allow you to access the dashboard without login for the first time only! ${process.env.FRONTEND_URL}/verifyuser/${token}`
        await sendMail(userSave.userName, subject, text);

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
