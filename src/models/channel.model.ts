import DataTypes from "sequelize"
import sequelizeORM from '../config/db';
import UserModel from "./users.models";

const Channelmodel = sequelizeORM.define('Channels', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  banner: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

UserModel.hasOne(Channelmodel, {foreignKey: 'user_id'})
Channelmodel.belongsTo(UserModel, {foreignKey: 'user_id'})

export default Channelmodel