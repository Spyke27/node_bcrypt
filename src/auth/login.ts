import { verificarSenha } from './bcrypt'
import { Request, Response } from 'express'
import { User } from '../models/userModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body

    try {
        const user = await User.findOne({where: { email }})

        if(user){
            const autorizado = await verificarSenha(senha, user.senha)

            if(autorizado){
                const token = jwt.sign({id: user.id}, process.env.PASSWORD_TOKEN as string, {expiresIn: '24h'})

                const usuario = {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    telefone: user.telefone,
                    cadastro: user.cadastro,
                    empresa_id: user.empresa_id,
                    data_nasc: user.data_nasc
                }

                return res.status(200).json(usuario);
            } 
            else {
                return res.status(401).json(`Senha incorreta!`)
            }
        } 
        else {
            return res.status(404).json("Usuário não encontrado!")
        }

    } catch (error) {
        res.json("Deu ruim: " + error)
    }
}