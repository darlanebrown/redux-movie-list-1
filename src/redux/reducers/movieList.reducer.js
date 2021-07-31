const initialState = null;

const movieListReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_MOVIE_LIST': {
            const movieList = localStorage.getItem('movieList');

            return movieList
                ? JSON.parse(movieList)
                : state;
        }
        case 'ADD_MOVIE_TO_LIST': {
            let movieList = localStorage.getItem('movieList');

            if (movieList) {
                movieList = JSON.parse(movieList);
                movieList.push(action.payload);
            } else {
                movieList = { list: [ action.payload ] }
            }
            localStorage.setItem('movieList', JSON.stringify(movieList));
            return movieList;
        }
        default:
            return state;
    }
}

export default movieListReducer;