import axios from 'axios'
const baseUrl = '/api/opencage'

const getData = async (body) => {
    const response = await axios.post(baseUrl, body)
    return response.data.results[0]
}

export default {
    getData
}