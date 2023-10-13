import { Request, Response} from 'express'
import { sequelize } from '../db/pg'

export const getAll = async (req: Request, res: Response) => {
    try {
        await sequelize.authenticate();
        res.send("Conectou")
    } 
    catch (error) {
        res.send("Deu ruim: " + error)
    }
}