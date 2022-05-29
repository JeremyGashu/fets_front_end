export const getToken = async () => {
    const storage = JSON.parse(localStorage.getItem('authData') || "{}")

    const token = storage.body && storage.body.token
    return token
}

export const getUserName = () => {
    const storage = JSON.parse(localStorage.getItem('authData') || "{}")

    const username = storage.body && storage.body.username
    return username
}