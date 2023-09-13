import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import {userRouter} from './routes/users.js'
import { propertyRouter } from './routes/property.js';
const app = express()

app.use(express.json());
app.use(cors());

app.use("/Auth", userRouter)
app.use("/Property", propertyRouter)

mongoose.connect(
    "mongodb+srv://hamdanmoataz:passwordpassword@capstonecluster.src0nb6.mongodb.net/?retryWrites=true&w=majority"
    )

app.listen(3001, () => console.log("SERVER STARTED!"));