import { useState } from 'react';
import { connect } from 'react-redux';

import { addMovieToList } from '../redux/actions/movieList.actions'

// import MovieApiService from '../services/movieApi.service';
import TheMovieDbApiService from '../services/themoviedbApi.service';

import SearchBar from './SearchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// const example = { "adult": false, "backdrop_path": "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", "genre_ids": [12, 878, 28], "id": 299534, "original_language": "en", "original_title": "Avengers: Endgame", "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.", "popularity": 245.575, "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg", "release_date": "2019-04-24", "title": "Avengers: Endgame", "video": false, "vote_average": 8.3, "vote_count": 18720 }


let MovieSearch = ({ addMovieToList }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  /** STATES */
  const [searchResults, setSearchResults] = useState();

  const onSearch = async (title) => {
    const response = await TheMovieDbApiService.searchMovieByName(title);

    setSearchResults(response.results);
  }

  const addToMovieList = async (id) => {
    const response = await TheMovieDbApiService.getMovieById(id);
    addMovieToList(response.results);
  }

  return (
    <Container>
      <SearchBar onSearch={onSearch} />
      <Row>
        {
          // maybe skip the ones missing an original_title
          searchResults && searchResults.map((movie) => (
            <Col xs={12} md={6} lg={3} key={movie.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={baseImgUrl + movie.poster_path} alt={`${movie.original_title ? movie.original_title : "No Title!"} poster`} />
                <Card.Body>
                  <Card.Title>{`${movie.original_title ? movie.original_title : "No Title!"} poster`}</Card.Title>
                  <Button variant="primary" onClick={() => addToMovieList(movie.id)}>Add To List</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

MovieSearch = connect(
  null,
  { addMovieToList },
)(MovieSearch)

// removeMovieFromList

export default MovieSearch;