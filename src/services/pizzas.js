import axios from 'axios'
const baseUrl = '/api/pizzas'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (pizza) => {
    const response = await axios.post(baseUrl, pizza)
    return response.data
}

export default {
    getAll,
    create
}