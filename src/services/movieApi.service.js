import axios from 'axios';
const apiKey = '39926dda';

export default class MovieApiService {
    getMoviesByTitle(title, page = 1) {
        return axios.get(`https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${apiKey}`)
            .then((res) => res.data)
            .catch((err) => console.error(err));
    }

    getMovieById(id) {
        return axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
            .then((res) => res.data)
            .catch((err) => console.error(err));
    }
}