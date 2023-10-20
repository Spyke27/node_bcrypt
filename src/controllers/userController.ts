import { Request, Response} from 'express'
import { Op, fn } from 'sequelize'
import { User } from '../models/userModel'

export const getAll = async (req: Request, res: Response) => {
    try {
        let users = await User.findAll({
            attributes: {
                exclude: ['id']
            },
            limit: 20
        })

        res.status(200).json(users)
    } 
    catch (error) {
        res.json("Deu ruim: " + error)
    }
}
// Pesquisar pelo nome
export const getUser = async (req: Request, res: Response) => {
    try {
        const nome = req.params.nome
        const user = await User.findOne({
            where: {
                nome: {
                    [Op.like]: `%${nome}%`
                }
            }

        })
        res.status(200).json(user)

    } catch (error) {
        res.json("Deu ruim: " + error)
    }
}