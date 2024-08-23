import DataTypes from "sequelize"
import sequelizeORM from '../config/db';
import Channelmodel from "./channel.model";

const streamsModel = sequelizeORM.define('streams', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  path:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  terminated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  messages: {
    type: DataTypes.JSONB,
    allowNull: false,
  }
}, { 
    timestamps: true
});

Channelmodel.hasMany(streamsModel, {foreignKey: 'channel_id'})
streamsModel.belongsTo(Channelmodel, {foreignKey: 'channel_id'})


export default streamsModel