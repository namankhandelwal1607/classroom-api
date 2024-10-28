import { Class } from "../models/classModel.js";
import { User } from "../models/userModel.js";

const getClassTeachers = async (req, res) => {
    try {
        const classId = req.params.classId;
        console.log(classId);

        const reqClass = await Class.findOne({ _id: classId });
        if (reqClass && reqClass.classTeachers.length > 0) {
            const teachers = await Promise.all(
                reqClass.classTeachers.map(teacherId => User.findOne({ _id: teacherId }))
            );

            const usernames = teachers.map(teacher => teacher?.userName).filter(Boolean);

            res.json({ usernames });
        } else {
            res.json({ message: "No teacher found in this class." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching teachers." });
    }
};

export default getClassTeachers;
