import { Announcement } from "../models/announcementModel.js";
import { User } from "../models/userModel.js";
import { Class } from "../models/classModel.js";

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

        const newAnnouncement = new Announcement({
            className: classn._id,
            userName: user._id,
            announcement
        });

        const savedAnnouncement = await newAnnouncement.save();

        // Push the announcement ID to the classAnnouncement array in the Class model
        classn.classAnnouncement.push(savedAnnouncement._id);
        await classn.save();

        return res.status(201).json({
            message: 'Announcement created successfully',
            success: true,
            data: savedAnnouncement
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || 'An error occurred while creating the announcement',
            success: false
        });
    }
};

export default announcement;
