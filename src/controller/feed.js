import axios from "axios"
import { getToken } from "../configs/token"
import { BASE_URL } from "../configs/urls"
import { toast } from "react-toastify"


export const getAllFeeds = async () => {
    let response = await axios.get(`${BASE_URL}/feed`)
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, }))
        }
    }
    console.log(response.data)
    return response.data && response.data.body
}

export const getFeedById = async (id) => {
    let response = await axios.get(`${BASE_URL}/feed${id}`)
    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
            response.data.errors.forEach(error => toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, }))
        }
    }
    return response.data
}

export const createFeed = async (data) => {
    const { title, metadata, coverImage } = data

    const formData = new FormData();
    formData.append('metadata', metadata)
    formData.append('title', title)
    formData.append('description', 'Description...')
    formData.append('feedImage', coverImage)

    let response = await axios.post(`${BASE_URL}/feed`, formData, {
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    if (response.data && response.data.errors) {
        return response.data.errors.forEach(error => toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, }))
    }
    return response.data
}