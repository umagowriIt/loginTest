import  api from "../api"
import { loginDataInterface } from "../interfaces/login";
import { LOGIN_USER } from "./endpoints";

export const loginUser = (loginData : loginDataInterface) => {
    return api.post(LOGIN_USER, {...loginData});
}