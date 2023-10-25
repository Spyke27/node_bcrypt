import express from 'express';
import { cadastrarUsuario, deletarUsuario, listarUsuarios, getUserById, getUserByName, atualizarUsuario } 
from '../controllers/userController';
import { login } from '../auth/login';

export const userRoute = express();

userRoute.get('/usuarios', listarUsuarios)
userRoute.get('/usuarios/id/:id', getUserById)
userRoute.get('/usuarios/nome/:nome', getUserByName)

userRoute.post('/usuarios/cadastrar', cadastrarUsuario)
userRoute.put('/usuarios/atualizar/:id', atualizarUsuario)
userRoute.delete('/usuarios/deletar/:id', deletarUsuario)

userRoute.post('/usuarios/login', login)
