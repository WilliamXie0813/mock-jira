import { User } from "types/user";
import { http } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

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
        })
}

export const register = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(async (res) => {
        return handleUserResponse(await res.json());
    });
}

export const logout = async () => window.localStorage.setItem(localStorageKey, "");