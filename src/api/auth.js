import { http } from './api';

const AUTH = '/auth'

const LOGIN = AUTH + '/login';
const LOGOUT = AUTH + '/logout';

export function authenticate() {
    return http.get(AUTH)
}

export function login(email, password) {
    const data = {
        email, password
    }
    return http.post(LOGIN, data)
}

export function logout() {
    return http.post(LOGOUT)
}