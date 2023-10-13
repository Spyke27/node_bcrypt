import express from 'express';
import { getAll } from '../controllers/users';

export const routes = express();

routes.get('/', getAll);