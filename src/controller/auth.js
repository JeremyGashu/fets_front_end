import axios from "axios"


export const loginRequest = async (auth) => {
    const { username, password } = auth
    let response = await axios.post(`/auth/login`, { username, password })
    if (response.status === 200 && !response.data.error) {
        localStorage.setItem('authData', JSON.stringify(response.data))
    }

    return response.data
}