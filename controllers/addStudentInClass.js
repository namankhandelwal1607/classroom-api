import { Class } from '../models/classModel.js';
import { User } from '../models/userModel.js';

const addStudentInClass = async (req, res) => {
    const { classId, userName } = req.body;

    try {
        const cl = await Class.findOne({ _id: classId });
        const us = await User.findOne({userName: userName });

        if (cl && us) {
            const isStudentInClass = cl.classStudents.includes(us._id);
            const isClassInUser = us.classStudent.includes(classId);

            if (!isStudentInClass) {
                cl.classStudents.push(us._id);
            }

            if (!isClassInUser) {
                us.classStudent.push(classId);
            }

            await cl.save();
            await us.save();

            return res.status(200).json({
                message: 'Student added to class successfully',
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
            message: 'An error occurred while adding the student to the class',
            success: false
        });
    }
};

export default addStudentInClass;
