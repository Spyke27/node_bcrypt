import { verificarSenha } from './bcrypt'
import { Request, Response } from 'express'
import { User } from '../models/userModel'

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body

    try {
        const user = await User.findOne({where: { email }})

        if(user){
            const autorizado = await verificarSenha(senha, user.senha)

            if(autorizado){
                return res.status(200).json(`Bem vindo, ${user.nome}`)
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