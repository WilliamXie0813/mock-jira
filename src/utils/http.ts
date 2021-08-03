import qs from "qs";
import axios, { AxiosRequestConfig } from "axios";
import * as auth from 'auth-provider';
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends AxiosRequestConfig {
    data?: object;
    token?: string;
}

export const http = (endPoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if (config.method === 'GET') {
        endPoint += `?${qs.stringify(data)}`
    } else {
        config.data = data || {}
    }
    return axios(`${apiUrl}/${endPoint}`, config).then((response) => {
        const data = response.data;
        return data;
    }).catch(err => {
        auth.logout();
        window.location.reload();
        return Promise.reject({ message: err })
    })
}

export const useHttp = () => {
    const { user } = useAuth();
    return (...[endPoint, config]: Parameters<typeof http>) => http(endPoint, { ...config, token: user?.token })
}