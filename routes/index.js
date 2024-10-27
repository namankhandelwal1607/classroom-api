import express from 'express';
import signUp from '../controllers/signUp.js';
import signIn from '../controllers/signIn.js';
import createClass from '../controllers/createClass.js';
import announcement from '../controllers/announcement.js';
const router = express.Router();

router
    .post('/signUp', signUp)
    .post('/signIn', signIn)
    .post('/createClass', createClass)
    .post('/announcement', announcement)

    export {router};