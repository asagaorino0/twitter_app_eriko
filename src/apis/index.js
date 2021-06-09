import axios from 'axios'
const API = axios.create({
    baseURL: 'https://qiita.com/'
})
export const fetchGetData = async () => {
    return await API.get('api/v2/items')
}
