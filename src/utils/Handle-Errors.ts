import { Response } from "express"

const HandleErrors = (error: any, res: Response) => {
    let status = 500
    let message = "ocurrio un error"

    if (error.message === "PASS_INCORRECT") status = 401, message = "Credenciales inválidas"

    return res.status(status).json({
        status,
        message,
        route: "/login"
    })
}



export default HandleErrors