const Sequelize = require('sequelize');
const { DB_NAME, HOST_DB, PASSWORD_DB, PORT_DB, USER_DB } = require('./env');

export const sequelizeORM = new Sequelize(
    DB_NAME,
    USER_DB,
    PASSWORD_DB,
    {
      host: HOST_DB,
      port: PORT_DB,
      dialect: 'postgres',
      logging: false,
      timezone: '-04:00'
    }
  )

export default sequelizeORM