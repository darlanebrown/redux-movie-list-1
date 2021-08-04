import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import TheMovieDbApi from '../services/themoviedbApi.service';
import "../styles/MovieDetails.css";

const MovieDetails = ({ selectedMovieId }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const [details, setDetails] = useState({});

  const getMovie = async (id) => {
    const movieResponse = await TheMovieDbApi.getMovieById(id);
    setDetails(movieResponse);
  }

  useEffect(() => {
    getMovie(selectedMovieId) // maybe type check this
  }, [selectedMovieId]);

  // empty object state means were still loading...
  if (Object.entries(details).length === 0) {
    return <h2>Loading...</h2>
  // api returns an error
  } else if (details.Error) {
    return (
    <div className="movie-list-error">
      <h2>{details.Error}</h2>
    </div>
    )
  }
  //{ Poster, Title, Rated, Runtime, Genre, Plot, Actors, imdbRating }
  return (
    <div>
      <div className="movie-poster-container">
        <img src={baseImgUrl + details.poster_path !== "N/A" ? baseImgUrl + details.poster_path : `${process.env.PUBLIC_URL}/poster-placeholder.png`} alt={details.title}/>
      </div>
      <div className="movie-details-container">
        <div className="information-container">
          <h2 className="title">{details.title}</h2>
          <span className="rating">{details.vote_average}</span>
        </div>
        {/* ButtonContainer */}
        <div className="button-container">
          <div className="button">{details.status}</div>
          <div className="button">{details.runtime}</div>
          <div className="button">{details.genres[0].name}</div>
        </div>
        {/* DescriptionContainer */}
        <div className="description-container">
          <h3>Plot</h3>
          <p>{details.overview}</p>
        </div>
        <div className="description-container">
          <h3>Tagline</h3>
          <p>{details.tagline}</p>
        </div>
      </div>
    </div>
  )
}

MovieDetails.propTypes = {
  selectedMovieId: PropTypes.string
};

export default MovieDetails;