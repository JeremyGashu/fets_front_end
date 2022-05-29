import axios from "axios"
import { toast } from "react-toastify"
import { getToken } from "../configs/localstorage_handler"
import { BASE_URL } from "../configs/urls"

export const getAllCompanies = async () => {
    let response = await axios.get(`${BASE_URL}/company`)
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, }))
        }
    }
    return response.data.body
}


export const getCompanyById = async (id) => {
    let response = await axios.get(`${BASE_URL}/feed/${id}`)
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error' }))
        }
    }
    return response.data
}

export const createCompany = async (data) => {
    const { name, email, phone, address, description } = data
    let response = await axios.post(`${BASE_URL}/company`, { name, email, phone, address, description }, {
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

export const deleteCompany = async ({ id }) => {
    console.log(id)
    let response = await axios.delete(`${BASE_URL}/company/${id}`, {
        headers: {
            'Authorization': `Bearer ${await getToken()}`
        }
    })

    return response.data
}