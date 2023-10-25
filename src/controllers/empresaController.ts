import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { Empresa } from '../models/empresaModel'
import { criptografarSenha } from '../auth/bcrypt'

export const listarEmpresas = async (req: Request, res: Response) => {
    try {
        const empresas = await Empresa.findAll({
            attributes: {
                exclude: ['id']
            }
        })
        return res.status(200).json(empresas)

    } catch (error) {
        res.json("Deu ruim: " + error)
    }
}

export const cadastrarEmpresa = async (req: Request, res: Response) => {
    const { cnpj, nome, email, senha, sobre } = req.body

    if (!cnpj || !nome || !email || !senha || !sobre) {
        return res.status(400).json("Digite todos os dados!")
    }

    try {
        const user = await Empresa.create({
            cnpj,
            nome,
            email,
            senha: await criptografarSenha(senha),
            sobre
        })
        return res.status(201).send()

    } catch (error) {
        res.json("Deu ruim: " + error)
    }

}