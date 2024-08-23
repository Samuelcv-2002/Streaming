import UserModel from "../../../models/users.models"
import * as bcrypt from 'bcrypt';
import { generateToken } from "../../utils/JWT";

export default class UserServices {

    public login = async (username: string, password: string) => {
        try {
            const result = await UserModel.findOne({where: {username}})
            const ResultCompare = await bcrypt.compare(password, result.password);
            if(!ResultCompare) throw("contraseña incorrecta")

            const token = generateToken({
                id: result.id,
                username: result.username
            })
            return {token}
        } catch (error) {
            return error
        }
    }
}