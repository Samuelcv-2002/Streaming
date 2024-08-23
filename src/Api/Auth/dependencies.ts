import AuthControllers from "./controller/auth.controller";
import AuthServices from "./services/auth.services";


export const auth_services = new AuthServices()
export const auth_controller = new AuthControllers(auth_services)