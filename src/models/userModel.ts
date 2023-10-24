import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/pg";

export interface UserInstance extends Model {
    id: number;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    idade: number;
    cadastro: Date | string
}

export const User = sequelize.define<UserInstance>("User", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER        
    },
    nome: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    },
    telefone: {
        type: DataTypes.STRING
    },
    idade: {
        type: DataTypes.INTEGER
    },
    cadastro: {
        type: DataTypes.DATE
    }
},
{
    tableName: "usuarios",
    freezeTableName: false, 
    timestamps: false
});