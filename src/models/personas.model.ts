import DataTypes from "sequelize"
import sequelizeORM from '../config/db';

const PersonasModel = sequelizeORM.define('Personas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  celular:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, { 
    timestamps: false
});



export default PersonasModel