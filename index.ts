import express from 'express';
import dotenv from 'dotenv';
import { userRoute } from './src/routes/user';
import { empresaRoute } from './src/routes/empresa'; 

dotenv.config();

const app = express();

app.use(express.json())
app.use(userRoute)
app.use(empresaRoute)

app.listen(process.env.PORT || 3000)