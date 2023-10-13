import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { routes } from './src/routes/user';

dotenv.config();

const app = express();

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT)