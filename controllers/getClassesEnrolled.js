import { User } from "../models/userModel.js";
const getClassesEnrolled = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    console.log(studentId);

    const user = await User.findOne({ _id: studentId });
    if (user) {
      res.json({ classStudent: user.classStudent});
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default getClassesEnrolled;
