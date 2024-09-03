import { Request, Response } from "express"
import UserServices from "../services/auth.services"
import HandleErrors from "../../../utils/Handle-Errors";

export default class AuthControllers{
    constructor (
       private user_services: UserServices
    ) {}

    public login = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const data = await this.user_services.login(body.username, body.pass)
            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            HandleErrors(error, res)
        }
    }
}