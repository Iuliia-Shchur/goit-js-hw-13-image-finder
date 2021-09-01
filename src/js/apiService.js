import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const key = '23195406-da0192683225ba1cc94043cce';

export function getPictures (query, page) {
return axios.get(`&q=${query}&page=${page}&per_page=12&key=${key}`)

}