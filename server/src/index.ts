import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";
import router from './routers/index.js';
import errorMiddelware from './middelwares/error-middelware.js';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 4000
const HOST: string = process.env.HOST || 'localhost'
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', router);
app.use(errorMiddelware);

const start = async () => {
    app.listen(PORT, HOST, () => console.log(`Start on PORT = ${PORT}, HOST = ${HOST}!!!`));
};

start();
