import { Request, Response } from "express"
import UserServices from "../services/auth.services"

export default class AuthControllers{
    constructor (
       private user_services: UserServices
    ) {}

    public login = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const data = await this.user_services.login(body.username, body.pass)
            res.status(200).json({
                ...data
            })
        } catch (error) {
            
        }
    }
}