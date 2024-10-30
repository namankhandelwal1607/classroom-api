import { Class } from '../models/classModel.js';
import { User } from '../models/userModel.js';

const addTeacherInClass = async (req, res) => {
    const { classId, userId } = req.body;

    try {
        const cl = await Class.findOne({ _id: classId });
        const us = await User.findOne({ _id: userId });

        if (cl && us) {
            const isTeacherInClass = cl.classTeachers.includes(userId);
            const isClassInUser = us.classTeacher.includes(classId);

            if (!isTeacherInClass) {
                cl.classTeachers.push(userId);
            }

            if (!isClassInUser) {
                us.classTeacher.push(classId);
            }

            await cl.save();
            await us.save();

            return res.status(200).json({
                message: 'Teacher added to class successfully',
                success: true,
                data: {
                    class: cl,
                    user: us
                }
            });
        } else {
            return res.status(404).json({
                message: 'Class or User not found',
                success: false
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'An error occurred while adding the teacher to the class',
            success: false
        });
    }
};

export default addTeacherInClass;
