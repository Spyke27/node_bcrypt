import { Request, Response } from 'express'
import { Op, QueryTypes } from 'sequelize'
import { User } from '../models/userModel'
import { criptografarSenha } from '../auth/bcrypt'
import { sequelize } from '../db/pg'
import { Empresa } from '../models/empresaModel'

export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await User.findAll({
            attributes: {
                exclude: ['id'],
            },
            include: [{
                model: Empresa,
                attributes: ['nome']
            }]
        })

        return res.status(200).json(usuarios)
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
            order: ['id'],
            include: [{
                model: Empresa,
                attributes: ['nome']
            }]
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

        const user = await User.findByPk(id, {include: [{model: Empresa, attributes: ['nome']}]})

        if (!user) {
            return res.status(404).json("Usuário não encontrado!")
        }

        return res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json("Deu ruim: " + error)
    }
}

export const cadastrarUsuario = async (req: Request, res: Response) => {
    const { nome, email, senha, telefone, data_nasc, empresa_id } = req.body

    if (!nome || !email || !senha || !telefone || !data_nasc) {
        return res.status(400).json("Digite todos os dados!")
    }

    try {
        const user = await User.create({
            nome,
            email,
            senha: await criptografarSenha(senha),
            telefone,
            data_nasc,
            empresa_id
        })
        return res.status(201).send()

    } catch (error) {
        res.json("Deu ruim: " + error)
    }

}

export const atualizarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params
    const { nome, email, telefone, empresa_id } = req.body

    const user = { nome, email, telefone, empresa_id }

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

export const deletarUsuario = async (req: Request, res: Response) => {
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