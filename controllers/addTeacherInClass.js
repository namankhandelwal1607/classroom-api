import { Class } from '../models/classModel.js';
import { User } from '../models/userModel.js';
import sendMail from '../helpers/sendMail.js';
const addTeacherInClass = async (req, res) => {
    const { classId, userName } = req.body;

    try {
        const cl = await Class.findOne({ _id: classId });
        const us = await User.findOne({userName: userName });

        if (cl && us) {
            const isTeacherInClass = cl.classTeachers.includes(us._id);
            const isClassInUser = us.classTeacher.includes(classId);

            if (!isTeacherInClass) {
                cl.classTeachers.push(us._id);
            }

            if (!isClassInUser) {
                us.classTeacher.push(classId);
            }

            await cl.save();
            await us.save();

            const subject = `ClassConnect: Added to ${cl.className} as teacher`;
            const text = `Dear ${userName},

We are pleased to inform you that you have been successfully added as the teacher of your classroom! You now have full access to manage students, assignments, and resources to support your teaching.

To get started, please visit your classroom by clicking on the link below: https://class-connect-five.vercel.app/${us._id}/teacher/${cl._id}

If you have any questions or need assistance, feel free to reach out. We are here to help you make the most of your teaching experience.`

await sendMail(userName, subject, text);

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
