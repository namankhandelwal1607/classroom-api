import { Class } from "../models/classModel.js";

const createClass = async (req, res) => {
  try {
    const { className, classDescription } = req.body;

      const newClass = new Class({
        className,
        classDescription
      });

      const savedClass = await newClass.save();

      return res.status(201).json({
        message: 'Class created successfully',
        success: true,
        data: savedClass
      });
    }
   catch (err) {
    return res.status(500).json({
      message: err.message || 'An error occurred while creating the class',
      success: false
    });
  }
};

export default createClass;
