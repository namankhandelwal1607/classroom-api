import { Class } from '../models/classModel.js';
import { User } from '../models/userModel.js';
import sendMail from '../helpers/sendMail.js';
import jwt from "jsonwebtoken";
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

            const subject = `ClassConnect: Added to ${cl.className} as student`;
            const text = `Dear ${userName},

We are pleased to inform you that you have been successfully added to your classroom! You can now access all the resources, assignments, and announcements prepared for you.

To get started, please visit your classroom by clicking on the link below:
https://class-connect-five.vercel.app/${us._id}/student/${cl._id}


If you have any questions or need assistance, feel free to reach out. We are here to help you make the most of your learning experience.`

await sendMail(userName, subject, text);


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
