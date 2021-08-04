export const getMovieList = () => ({ type: 'GET_MOVIE_LIST' });
export const addMovieToList = (payload) => ({ type: 'ADD_MOVIE_TO_LIST', payload });
export const removeMovieFromList = (payload) => ({ type: 'REMOVE_MOVIE_FROM_LIST', payload });
export const setSelectedMovieId = (payload) => ({ type: 'SET_SELECTED_MOVIE_ID', payload })
