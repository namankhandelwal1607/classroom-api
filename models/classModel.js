import mongoose from "mongoose";
import { Schema } from "mongoose";

const classSchema = new Schema({
    className: {type: String, required: true},
    classDescription: {type: String, required: false},
    classStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    classTeachers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    classAnnouncement: [{type: Schema.Types.ObjectId, ref: 'Announcement'}]
});

const Class = mongoose.model('Class', classSchema);

export {Class}