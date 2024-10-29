import express from 'express';
import signUp from '../controllers/signUp.js';
import signIn from '../controllers/signIn.js';
import createClass from '../controllers/createClass.js';
import announcement from '../controllers/announcement.js';
import getClassStudents from '../controllers/getClassStudents.js';
import getClassTeachers from '../controllers/getClassTeachers.js';
import getNameById from '../controllers/getNameById.js';
import getClassesEnrolled from '../controllers/getClassesEnrolled.js';
const router = express.Router();

router
    .post('/signUp', signUp)
    .post('/signIn', signIn)
    .post('/createClass', createClass)
    .post('/announcement', announcement)
    .get('/getClassStudents/:classId', getClassStudents)
    .get('/getClassTeachers/:classId', getClassTeachers)
    .get('/getName/:userId', getNameById)
    .get('/getClassesEnrolled/:studentId', getClassesEnrolled)
    export {router};