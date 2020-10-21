import axios from 'axios'
import config from '../config'

const client = axios.create({
    baseUrl: config.apiBaseUrl,
    headers: { 'Pragma': 'no-cache' }
})

client.interceptors.request.use((config) => {
    return config
}), (error) => {
    return Promise.reject(error)
}

client.interceptors.response.use((response) => {

    return response
}, (error) => {
    return Promise.reject(error)
}
)

export default client

