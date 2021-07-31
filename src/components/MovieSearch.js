import { useState } from 'react';
import { connect } from 'react-redux';

import { addMovieToList } from '../redux/actions/movieList.actions'

import MovieApiService from '../services/movieApi.service';

import SearchBar from './SearchBar';

// add removeMovieFromList
let MovieSearch = ({ addMovieToList }) => {
    const movieApiService = new MovieApiService();

    const [searchResults, setSearchResults] = useState(); 
    const onSearch = async (title) => {
        const results = await movieApiService.getMoviesByTitle(title);

        setSearchResults(results.Search);
    }

    const addToMovieList = async (id) => {
        const result = await movieApiService.getMovieById(id);
        addMovieToList(result);
    }

    return (
        <div>
            <SearchBar onSearch={onSearch}/>
            {
                searchResults && searchResults.map((movie) => (
                    <div key={movie.imdbID}>
                        <img src={movie.Poster} alt={`${movie.Title} poster`} />
                        <h3>{ movie.Title }</h3>
                        <button onClick={() => addToMovieList(movie.imdbID)}>Add To List</button>
                    </div>
                ))
            }
        </div>
    )
}

MovieSearch = connect(
    null,
    {addMovieToList},
)(MovieSearch)

// removeMovieFromList

export default MovieSearch;