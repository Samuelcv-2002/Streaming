import Sequelize from "sequelize"
import PostgresDialect from "@sequelize/postgres"
import { DB_NAME, HOST_DB, PASSWORD_DB, PORT_DB, USER_DB } from "./env";

const sequelizeORM = new Sequelize({
    dialect: PostgresDialect,
    database: DB_NAME,
    user: USER_DB,
    password: PASSWORD_DB,
    host: HOST_DB,
    port: PORT_DB,
    ssl: true,
    clientMinMessages: 'notice',
  });
  
export default sequelizeORM