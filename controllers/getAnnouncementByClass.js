import { Announcement } from "../models/announcementModel.js";
import { User } from "../models/userModel.js";

const getAnnouncementByClass = async (req, res) => {
    try {
        const classId = req.params.classId;
        console.log(classId);

        const announcements = await Announcement.find({ className: classId });
        
        const results = await Promise.all(announcements.map(async (ann) => {
            const teacher = await User.findOne({ _id: ann.userName });
            return {
                teacherName: teacher ? teacher.userName : null, 
                announcement: ann.announcement,
            };
        }));

        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
    }
};

export default getAnnouncementByClass;
