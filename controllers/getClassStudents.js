import { Class } from "../models/classModel.js";
import { User } from "../models/userModel.js";

const getClassStudents = async (req, res) => {
    try {
        const classId = req.params.classId;
        console.log(classId);

        const reqClass = await Class.findOne({ _id: classId });

        if (reqClass && reqClass.classStudents.length > 0) {
            const students = await Promise.all(
                reqClass.classStudents.map(studentId => User.findOne({ _id: studentId }))
            );
            
            // console.log(students);
            const usernames = students.map(student => student?.userName).filter(Boolean);

            res.json({ usernames });
        } else {
            res.json({ message: "No students found in this class." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching students." });
    }
};

export default getClassStudents;
