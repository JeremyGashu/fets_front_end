import axios from "axios"
import { BASE_URL } from "../configs/urls"

export const getAllFeeds = async () => {
    let response = await axios.get(`${BASE_URL}/feed`)
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error' }))
        }
    }
    return response.data
}

export const getFeedById = async (id) => {
    let response = await axios.get(`${BASE_URL}/feed${id}`)
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error' }))
        }
    }
    return response.data
}