import express from 'express';
import { cadastrarEmpresa, listarEmpresas } from '../controllers/empresaController';
import { login } from '../auth/login';

export const empresaRoute = express();

empresaRoute.get('/empresas', listarEmpresas)
empresaRoute.post('/empresas/cadastrar', cadastrarEmpresa)