import { useState } from 'react';
import { connect } from 'react-redux';

import { addMovieToList, getMovieList } from '../redux/actions/movieList.actions'

import TheMovieDbApiService from '../services/themoviedbApi.service';

import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import MovieModal from './MovieModal';
import MovieDetails from './MovieDetails';
import YouTubeEmbed from './YouTubeEmbed';

// const example = { "adult": false, "backdrop_path": "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", "genre_ids": [12, 878, 28], "id": 299534, "original_language": "en", "original_title": "Avengers: Endgame", "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.", "popularity": 245.575, "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg", "release_date": "2019-04-24", "title": "Avengers: Endgame", "video": false, "vote_average": 8.3, "vote_count": 18720 }

/** Movie Search page route: / */
let MovieSearch = ({ addMovieToList }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  /** STATES */
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState('');

  const handleSearch = async (title) => {
    const response = await TheMovieDbApiService.searchMovieByName(title);
    setSearchResults(response.results);
  }

  const handleAddToMovieList = async (id) => {
    const response = await TheMovieDbApiService.getMovieById(id);
    addMovieToList(response);
  }

  /**
   * handler for show details button on a MovieCard
   * @param {string} id 
   */
  const handleOnShowDetails = (id) => {
    setSelectedMovieId(id);
    setShowModal(true);
  }

  /**
   * handler for close button on MovieModal
   */
  const handleModalClose = () => {
    setSelectedMovieId("");
    setShowModal(false);
  }

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      <Row>
      {
        showModal && (
          <MovieModal
            show={showModal}
            onClose={handleModalClose}
          >
            <MovieDetails selectedMovieId={selectedMovieId} />
            <YouTubeEmbed
              movieId={selectedMovieId}
            />
          </MovieModal>
        )
      }
      {
        searchResults && searchResults.map((movie) => (
          <Col xs={12} md={6} lg={3} key={movie.id}>
            <MovieCard 
              movie={movie}
              onShowDetails={handleOnShowDetails} // showModal
              onAddToMovieList={handleAddToMovieList}
            />
          </Col>
        ))
      }
      </Row>
    </Container>
  )
}

const mapStateToProps = state => ({
  movieList: state.movieListReducer,
});

MovieSearch = connect(
  mapStateToProps,
  { addMovieToList },
)(MovieSearch)

// removeMovieFromList

export default MovieSearch;