import UserModel from "../../../models/users.models"
import * as bcrypt from 'bcrypt';
import { generateToken } from "../../../utils/JWT";

export default class UserServices {

    public login = async (username: string, password: string) => {
        const result = await UserModel.findOne({where: {username}})
            const ResultCompare = await bcrypt.compare(password, result.password);
            if(!ResultCompare) throw({
                message: "PASS_INCORRECT"
            })

            const token = generateToken({
                id: result.id,
                username: result.username
            })
            return {token}  
    }
}