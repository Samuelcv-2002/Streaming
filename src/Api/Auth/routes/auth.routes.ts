import { Router } from "express";
import { auth_controller } from "../dependencies";

const AuthRouter = Router()

AuthRouter.post('/login', auth_controller.login)

export default AuthRouter