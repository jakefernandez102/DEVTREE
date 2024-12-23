import express from 'express'
import 'dotenv/config';
import router from './routes/router';
import {connectDB} from './config/db'
import cors from 'cors'
import {optionCors} from './config/cors';
connectDB();

const app = express();

//cors
app.use(cors(optionCors))

//read form data as json
app.use(express.json());

//Routing
app.use('/',router);

export default app