import dotenv from 'dotenv';

dotenv.config();

export const {
    HOST_DB,
    PORT_DB,
    USER_DB,
    PASSWORD_DB,
    DB_NAME,
    JWT_KEY
} = process.env