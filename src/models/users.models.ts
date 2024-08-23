import DataTypes from "sequelize"
import sequelizeORM from '../config/db';
import PersonasModel from "./personas.model";

const UserModel = sequelizeORM.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});


PersonasModel.hasOne(UserModel, { foreignKey: 'persona_Id' });
UserModel.belongsTo(PersonasModel, { foreignKey: 'persona_Id' });


export default UserModel