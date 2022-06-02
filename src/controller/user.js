import axios from "axios"
import { toast } from "react-toastify"
import { getToken } from "../configs/localstorage_handler"
import { BASE_URL } from "../configs/urls"

export const getAllUsers = async () => {
    let response = await axios.get(`${BASE_URL}/user`, {
        headers: {
            'Authorization': `Bearer ${await getToken()}`
        }
    })
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, }))
        }
    }
    // console.log(response.data)
    return response.data.body
}


export const getUserByUsername = async (id) => {
    let response = await axios.get(`${BASE_URL}/user/username/${id}`, {
        headers: {
            'Authorization': `Bearer ${await getToken()}`
        }
    })
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error' }))
        }
    }
    console.log(response.data)
    return response.data
}

export const createUser = async (data) => {
    const { name, email, phone, role, active, company_id, username, password, address } = data
    let response = await axios.post(`${BASE_URL}/user`, { name, email, phone, role, status: active, company_id, username, address, password }, {
        headers: {
            'Authorization': `Bearer ${await getToken()}`
        }
    })
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, }))
        }
    }
    return response.data
}


export const deleteUser = async ({ id }) => {
    let response = await axios.delete(`${BASE_URL}/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${await getToken()}`
        }
    })

    return response.data
}


export const changeUserActivity = async (id, val) => {
    let response = await axios.patch(`${BASE_URL}/user/change-status/${id}`, { status: val }, {
        headers: {
            'Authorization': `Bearer ${await getToken()}`

        }
    })
    return response.data
}