import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { User } from '../models/userModel'
import { criptografarSenha } from '../auth/bcrypt'

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['id']
            }
        })

        res.status(200).json(users)
    }
    catch (error) {
        res.json("Deu ruim: " + error)
    }
}
// Pesquisar pelo nome
export const getUserByName = async (req: Request, res: Response) => {
    try {
        const nome = req.params.nome
        const user = await User.findAll({
            where: {
                nome: {
                    [Op.iLike]: `%${nome}%`
                }
            },
            order: ['id']
        })
        res.status(200).json(user)

    } catch (error) {
        res.json("Deu ruim: " + error)
    }
}
// Pesquisar pelo ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const user = await User.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        if (!user) {
            return res.status(404).json("Usuário não encontrado!")
        }

        return res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json("Deu ruim: " + error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { nome, email, senha, telefone, idade } = req.body

    if (!nome || !idade || !email || !senha || !telefone) {
        return res.status(400).json("Digite todos os dados!")
    }

    try {
        const user = await User.create({
            nome,
            email,
            senha: await criptografarSenha(senha),
            telefone,
            idade,
            cadastro: new Date()
        })

        return res.status(201).send()

    } catch (error) {
        res.json("Deu ruim: " + error)
    }

}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { nome, email, telefone, idade} = req.body

    const user = { nome, email, telefone, idade }

    try {
        await User.update(user, {
            where: { id }
        })
        return res.status(201).send()
    } 
    catch (error) {
        res.json("Deu ruim: " + error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await User.findOne({
            where: { id }
        })
    
        if(user){
            await user.destroy()
            return res.status(200).json("Usuário deletado!")
        }

        return res.status(400).json("Usuário não encontrado")
    } 
    catch (error) {
        res.json("Deu ruim: " + error)
    }
}