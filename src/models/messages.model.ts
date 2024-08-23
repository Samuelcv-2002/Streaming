import DataTypes from "sequelize"
import sequelizeORM from '../config/db';
import UserModel from "./users.models";

const MessagesModel = sequelizeORM.define('messages', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { 
    timestamps: true
});

UserModel.hasMany(MessagesModel, {foreignKey: 'user_id'})
MessagesModel.belongsTo(UserModel, {foreignKey: 'user_id'})

export default MessagesModel