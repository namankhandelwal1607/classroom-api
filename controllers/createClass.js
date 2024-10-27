import { Class } from "../models/classModel.js";
import { User } from "../models/userModel.js";

const createClass = async (req, res) => {
    try {
        const { className, classDescription, classStudents, classTeachers } = req.body;

        const studentUsers = await User.find({ userName: { $in: classStudents } });
        const studentIds = studentUsers.map(user => user._id);

        const teacherUsers = await User.find({ userName: { $in: classTeachers } });
        const teacherIds = teacherUsers.map(user => user._id);

        const existingClass = await Class.findOne({ className });

        if (existingClass) {
            const newStudentIds = studentIds.filter(id => !existingClass.classStudents.includes(id));
            const newTeacherIds = teacherIds.filter(id => !existingClass.classTeachers.includes(id));

            existingClass.classStudents.push(...newStudentIds);
            existingClass.classTeachers.push(...newTeacherIds);

            await existingClass.save();

            return res.status(200).json({
                message: 'Class updated successfully',
                success: true,
                data: existingClass
            });
        } else {
            const newClass = new Class({
                className,
                classDescription,
                classStudents: studentIds,
                classTeachers: teacherIds
            });

            const savedClass = await newClass.save();

            return res.status(201).json({
                message: 'Class created successfully',
                success: true,
                data: savedClass
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message || 'An error occurred while creating the class',
            success: false
        });
    }
};

export default createClass;
    