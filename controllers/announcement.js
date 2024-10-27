import { Announcement } from "../models/announcementModel.js";
import { User } from "../models/userModel.js";
import { Class } from '../models/classModel.js';

const announcement = async (req, res) => {
    try {
        const { className, userName, announcement } = req.body;

        const user = await User.findOne({ userName });
        const classn = await Class.findOne({ className });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }

        if (!classn) {
            return res.status(404).json({
                message: 'Class not found',
                success: false,
            });
        }

        // Create a new announcement
        const newAnnouncement = new Announcement({
            className: classn._id, // Use the class's ObjectId
            userName: user._id,     // Use the user's ObjectId
            announcement
        });

        // Save the announcement to the database
        await newAnnouncement.save();

        return res.status(201).json({
            message: 'Announcement created successfully',
            success: true,
            data: newAnnouncement
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || 'An error occurred while creating the announcement',
            success: false
        });
    }
};

export default announcement;
