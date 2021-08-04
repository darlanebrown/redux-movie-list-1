import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import TheMovieDbApiService from '../services/themoviedbApi.service';
import { useEffect, useState } from 'react';

/** width: 340 height: 390  */
const YouTubeEmbed = ({ width = 1024, height = 512, movieId }) => {
  const [youtubeId, setYoutubeId] = useState('');

  const handleOnReady = (event) => {
    console.log('handle on ready');
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }


  useEffect(() => {
    const getYouTubeId = async (movieId) => {
      const response = await TheMovieDbApiService.getVideosById(movieId);
      const search = response.results.find(movie => movie.site === 'YouTube');
      if (search) {
        setYoutubeId(search.key);
      }
    }
    getYouTubeId(movieId);
  }, [movieId]);

  return (
    youtubeId &&
      <YouTube
        videoId={youtubeId}
        opts={{ height, width, playerVars: { autoplay: 0 } }}
        onReady={handleOnReady}
      />
  )
}

YouTubeEmbed.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  movieId: PropTypes.string.isRequired,
};

export default YouTubeEmbed;