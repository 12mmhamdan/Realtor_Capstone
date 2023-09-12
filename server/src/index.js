import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import {userRouter} from './routes/users.js'

const app = express()

app.use(express.json());
app.use(cors());

app.use("/Auth", userRouter)

mongoose.connect(
    "mongodb+srv://hamdanmoataz:passwordpassword@capstonecluster.src0nb6.mongodb.net/?retryWrites=true&w=majority"
    )

app.listen(3001, () => console.log("SERVER STARTED!"));