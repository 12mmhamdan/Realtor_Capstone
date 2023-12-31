import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {userRouter} from './routes/users.js'
import { propertyRouter } from './routes/property.js';

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors());

app.use("/Auth", userRouter)
app.use("/Property", propertyRouter)

mongoose.connect(
    process.env.MONGODB_URI
    )

app.listen(3001, () => console.log("SERVER STARTED!"));