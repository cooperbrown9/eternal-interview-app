import { http } from './api';

const AUTH = '/auth'

const LOGIN = AUTH + '/login';

export function authenticate() {
    return http.get(AUTH)
}

export function login(email, password) {
    const data = {
        email, password
    }
    return http.post(LOGIN, data)
}