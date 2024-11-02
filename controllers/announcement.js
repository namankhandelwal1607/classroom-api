import { Announcement } from "../models/announcementModel.js";
import { User } from "../models/userModel.js";
import { Class } from "../models/classModel.js";
import sendMail from '../helpers/sendMail.js';
const announcement = async (req, res) => {
    try {
        const { className, userName, announcement } = req.body;
        const user = await User.findOne({ _id: userName });
        const classn = await Class.findOne({ _id: className });

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
            className,
            userName,
            announcement
        });
        console.log("sssssss", announcement);
        const savedAnnouncement = await newAnnouncement.save();

        classn.classAnnouncement.push(savedAnnouncement._id);
        await classn.save();
    

        for (const students of classn.classStudents) {
            const stud = await User.findOne({_id: students});
            const subject = `ClassConnect: New announcement in ${classn.className}`;
            const text = `Dear ${stud.userName},\n\nNew Announcement in ${classn.className} from ${user.userName}:\n\n${savedAnnouncement.announcement}`;
            await sendMail(stud.userName, subject, text);
        }
        
       

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

