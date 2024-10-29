import { Class } from '../models/classModel.js';

const getClassDetails = async (req, res) => {
  try {
    const classId = req.params.classId;
    console.log(classId);

    const classn = await Class.findOne({ _id: classId });
    if (classn) {
      res.json({ className: classn.className, classDescription: classn.classDescription });
    } else {
      res.status(404).json({ error: "Class not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default getClassDetails;
