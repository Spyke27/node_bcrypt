import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/pg'

export interface MusicaInstance extends Model {
    id: number;
    compositor: string;
    composicao: string;
    ritmo: string;
    grupo: string;
    tempo: number
}

export const Musica = sequelize.define<MusicaInstance>("Musica", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    compositor: {
        type: DataTypes.STRING
    },
    composicao: {
        type: DataTypes.STRING
    },
    ritmo: {
        type: DataTypes.STRING
    },
    grupo: {
        type: DataTypes.STRING
    },
    tempo: {
        type: DataTypes.INTEGER
    }
},
{
    tableName: 'musicas',
    timestamps: false,
    freezeTableName: false
}) 