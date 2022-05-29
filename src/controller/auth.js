import axios from "axios"
import { toast } from "react-toastify"
import { BASE_URL } from "../configs/urls"

export const loginRequest = async (auth) => {
    const { username, password } = auth
    let response = await axios.post(`${BASE_URL}/auth/login`, { username, password })
    if (response.status === 200 && !response.data.error) {
        localStorage.setItem('authData', JSON.stringify(response.data))
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error',position: toast.POSITION.BOTTOM_RIGHT, }))
        }
    }
    return response.data
}

export const logOut = async () => {
    localStorage.removeItem('authData')
}