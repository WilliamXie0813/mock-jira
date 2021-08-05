import { User } from "types/user";
import { http } from "utils/http";

const localStorageKey = '__auth_provider_token__';

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user?.token ?? '');
    return user;
}

export const login = (data: { username: string, password: string }) => {

    return http("login", { data: data, method: "POST" })
        .then((res) => {
            return handleUserResponse(res);
        }).catch(error => {
            return Promise.reject(error)
        })
}

export const register = (data: { username: string, password: string }) => {

    return http("register", { data: data, method: "POST" })
        .then((res) => {
            return handleUserResponse(res);
        }).catch(error => {
            return Promise.reject(error)
        })
}

export const logout = async () => window.localStorage.setItem(localStorageKey, "");