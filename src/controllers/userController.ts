import { Request, Response} from 'express'
import { Op, fn } from 'sequelize'
import { User } from '../models/userModel'

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
                    [Op.like]: `%${nome}%`
                }
            }
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

        if(!user){
            return res.status(404).json("Usuário não encontrado!")
        }
        
        return res.status(200).json(user) 
    }
    catch(error) {
        res.status(400).json("Deu ruim: " + error)
    }
}