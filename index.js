import express from 'express';
import {main} from './config/connectDatabase.js';
import dotenv from 'dotenv';
import { router } from './routes/index.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    console.log("request recieved");
    res.send("Namaste");
})

app.use('/', router);


main().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server started at " + PORT);
    })
})