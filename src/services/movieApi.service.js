import axios from 'axios';
const apiKey = 'a69bb51b5fe4880a076e1fe53c14acf4';

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