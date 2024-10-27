import express from 'express';
import signUp from '../controllers/signUp.js';
import signIn from '../controllers/signIn.js';
const router = express.Router();

router
    .post('/signUp', signUp)
    .post('/signIn', signIn)

    export {router};