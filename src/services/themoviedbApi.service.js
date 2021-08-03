import axios from 'axios';

const myApiKey = process.env.REACT_APP_OMDB_API_KEY;
const url = "https://api.themoviedb.org/3";

export default class TheMovieDbApiService {
  static async searchMovieByName(name) {
    const result = await axios.get(`${url}/search/movie?api_key=${myApiKey}&language=en-US&query=${name}&page=1&include_adult=false`);
    if (result.success && result.success === "false") {
      // for now ill return result.data but throwing an error here would be better
      console.warn(`Error in endpoint /search/movie! ${result.data.status_message}`);
      return result.data;
    } else {
      return result.data;
    }
  }

  static async getMovieById(id) {
    const result = await axios.get(`${url}/movie/${id}/videos?api_key=${myApiKey}&language=en-US`);
    if (result.success && result.success === "false") {
      // for now ill return result.data but throwing an error here would be better
      console.warn(`Error in endpoint /movie/${id}/videos! ${result.data.status_message}`);
      return result.data;
    } else {
      return result.data;
    }
    // movie/299534/videos?api_key=68d1dc4bd80fd0b21d0c0d3cb4846c5d&language=en-US
  }
}