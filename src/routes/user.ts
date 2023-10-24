import express, { Response, Request} from 'express';
import { createUser, deleteUser, getAll, getUserById, getUserByName, updateUser } from '../controllers/userController';
import { login } from '../auth/login';

export const routes = express();

routes.get('/usuarios', getAll)
routes.get('/usuarios/id/:id', getUserById)
routes.get('/usuarios/nome/:nome', getUserByName)

routes.post('/usuarios/cadastrar', createUser)
routes.put('/usuarios/atualizar/:id', updateUser)
routes.delete('/usuarios/deletar/:id', deleteUser)

routes.post('/usuarios/login', login)
