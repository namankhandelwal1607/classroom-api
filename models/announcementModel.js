import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const announcementSchema = new Schema({
    className: {type: Schema.Types.ObjectId, ref: 'Class', required: true},
    userName: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    announcement: {type: String}
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export {Announcement}